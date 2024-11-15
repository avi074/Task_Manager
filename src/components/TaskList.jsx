import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { PRIORITY, STATUS, PCOLOR, SCOLOR } from "../utils/constants.js";
import { useMemo, useState } from "react";

function TaskItem({
  tasks,
  events: { handleEdit, handleDelete, handleStatus },
}) {
  const baseFilter = {
    name: "",
    priority: "",
    status: "",
  };
  const [filter, setFilter] = useState(baseFilter);
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      return (
        (filter.name
          ? task.name.toLowerCase().includes(filter.name.toLowerCase())
          : true) &&
        (filter.priority ? task.priority == filter.priority : true) &&
        (filter.status ? task.status == filter.status : true)
      );
    });
  }, [tasks, filter]);

  const handleChange = (name, value) => {
    setFilter((f) => ({ ...f, [name]: value }));
  };

  return (
    <>
      <form
        id='filter-form'
        className='mb-4 px-2 py-4 border-b-2 flex flex-wrap md:flex-no-wrap gap-4 md:justify-around'
        onReset={() => setFilter(baseFilter)}
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <div className='w-full md:w-[35%]'>
          <Input
            type='search'
            label='Search tasks...'
            placeholder='Search tasks...'
            name='name'
            value={filter.name}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className='w-full md:w-[35%] flex gap-4 md:justify-around'>
          <Select
            label='Priority'
            value={filter.priority}
            color={PCOLOR[filter.priority]}
            onChange={(e) => {
              handleChange("priority", e);
            }}
            containerProps={{
              className: "input-container",
            }}>
            {PRIORITY.map((ele, index) => (
              <Option
                key={`filter-priority-${ele}-${index}`}
                value={`${index}`}>
                {ele}
              </Option>
            ))}
          </Select>
          <Select
            label='Status'
            value={filter.status}
            color={SCOLOR[filter.status]}
            onChange={(e) => {
              handleChange("status", e);
            }}
            containerProps={{
              className: "input-container",
            }}>
            {STATUS.map((ele, index) => (
              <Option key={`filter-status-${ele}-${index}`} value={`${index}`}>
                {ele}
              </Option>
            ))}
          </Select>
        </div>
        <div className='w-full md:w-fit flex gap-4 items-center'>
          <Button type='submit' size='md' variant='gradient' color='green'>
            Filter
          </Button>
          <Button type='reset' size='md' variant='gradient' color='red'>
            Reset
          </Button>
        </div>
      </form>
      {/* Tasks List */}
      <ul className='p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 place-content-center place-items-center'>
        {filteredTasks?.map(({ id, name, desc, priority, status }) => (
          <li className='mx-auto my-4 w-full lg:m-0 lg:px-4' key={`Task-${id}`}>
            <Card variant='gradient' color='gray'>
              <CardBody>
                <Typography
                  variant='small'
                  className='text-right text-sm font-medium tracking-wide text-light-blue-300'>
                  {new Date(id).toLocaleString("en-IN")}
                </Typography>
                <Typography
                  variant='h4'
                  color='white'
                  className='tracking-wide font-normal'>
                  {name}
                </Typography>
                <div className='text-amber-700 text-sm'>
                  <pre className='line-clamp-3'>{desc}</pre>
                </div>
              </CardBody>

              <CardFooter className='pt-0'>
                <div className='flex justify-around flex-wrap mb-4'>
                  <Typography variant='h6' color={PCOLOR[priority]}>
                    Priority : {PRIORITY[priority]}
                  </Typography>
                  <Typography variant='h6' color={SCOLOR[status]}>
                    Status :{" "}
                    <Button
                      color={SCOLOR[status]}
                      className='p-2'
                      disabled={status == 0}
                      onClick={() => {
                        handleStatus(id, status == 1 ? 2 : 1);
                      }}>
                      {STATUS[status]}
                    </Button>
                  </Typography>
                </div>

                {/* Button Group */}
                <div className='flex justify-around flex-wrap gap-2'>
                  <Button
                    variant='outlined'
                    color='blue'
                    onClick={() => {
                      handleEdit(id);
                    }}
                    disabled={status == 0}>
                    Edit
                  </Button>

                  <Button
                    variant='gradient'
                    color='red'
                    onClick={() => {
                      handleDelete(id);
                    }}>
                    Delete
                  </Button>

                  <Button
                    variant='text'
                    color='green'
                    className='p-2 shadow-sm shadow-white'
                    onClick={() => {
                      handleStatus(id, status > 0 ? 0 : 1);
                    }}>
                    Mark as {status > 0 ? "Done" : "Undone"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskItem;
