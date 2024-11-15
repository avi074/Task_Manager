import { Button } from "@material-tailwind/react";
import todoIcon from "../assets/todo.svg";
import addIcon from "../assets/add.svg";

function Header({ events: { addTask } }) {
  return (
    <>
      <header className='p-4 shadow-lg rounded-b-xl border-2 ibm-plex-mono-semibold border-gray-300 bg-gray-50 flex items-center'>
        <img src={todoIcon} alt='' className='size-8' />
        <h1 className='ml-4 uppercase text-3xl text-blue-800'>Task Manager</h1>
        <Button
          variant='gradient'
          color='green'
          className='p-1 flex gap-2 items-center mx-auto md:mr-8 md:ml-auto rounded-xl'
          onClick={addTask}>
          <img
            src={addIcon}
            alt=''
            className='size-8 rounded-full border-2 border-green-600 bg-white'
          />
          <span className='text-lg mr-2 hidden md:block'>Add Task</span>
        </Button>
      </header>
    </>
  );
}

export default Header;
