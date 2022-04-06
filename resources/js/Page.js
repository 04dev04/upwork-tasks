 // import libs
import { useState, useEffect } from 'react';

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('/task/show');
    const tasksData = await response.json();
    setTasks(tasksData)
  }

  const closeModal = () => {
    setTitle('')
    setShowModal(false)
  }

  const titleChanged = (e) => {
    setTitle(e.target.value)
  }

  const taskSelected = (e) => {
    setSelectedTask(e.target.value)
  }

  const add = () => {
    fetch('/task/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': document.querySelector('[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify({ title: title })
    })
    .then(() => {
      fetchTasks();
    });

    closeModal()
  }

  const taskDelete = () => {
    if (selectedTask === undefined) {
      alert('No task selected!');
    } else {
      fetch('/task/delete/'+selectedTask, {
        method: 'DELETE',
        headers: {
          'x-csrf-token': document.querySelector('[name="csrf-token"]').getAttribute('content'),
        },
      })
      .then(() => {
        fetchTasks();
      });
    }
  }

  const taskComplete = () => {
    if (selectedTask === undefined) {
      alert('No task selected!');
      return
    } else {
      fetch('/task/complete/'+selectedTask, {
        method: 'PATCH',
        headers: {
          'x-csrf-token': document.querySelector('[name="csrf-token"]').getAttribute('content'),
        },
      })
      .then(() => {
        fetchTasks();
      });
    }
  }

  return (
    <>
      <div className="p-8">
          <div className='flex justify-around text-white'>
              <button onClick={() => setShowModal(true)} className="font-bold bg-green-500 hover:bg-green-700 py-2 px-4 rounded w-32">Add</button>
              <button onClick={() => taskDelete() } className="font-bold bg-red-500 hover:bg-red-700 py-2 px-4 rounded w-32">Delete</button>
              <button onClick={() => taskComplete() } className="font-bold bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded w-32">Complete</button>
          </div>

          <div className='flex flex-col mt-16'>
            { 
              tasks.map(el => {
                return (
                  <div htmlFor={ 'radio-'+el.id } onChange={ taskSelected } key={ el.id } className="flex items-center justify-center my-2 py-2 border rounded">
                    <input type="radio" name="task" id={ 'radio-'+el.id } value={ el.id } />
                    <label htmlFor={ 'radio-'+el.id } className={`ml-2 ${el.completed == 'yes' ? "line-through" : ""}`}>{ el.title }</label>
                  </div>
                )
              })
            }
          </div>
      </div>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add To Do
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Title: 
                    <input 
                      value={ title }
                      onChange={ titleChanged }
                      className='rounded border ml-2 px-4 py-1' type="text" />
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={ () => add() }
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
