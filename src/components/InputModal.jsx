import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { PRIORITY, PCOLOR } from "../utils/constants.js";

/**
 * Input Modal for updating ToDos
 */
function InputModal({ open, task, events: { handleDialog, updateTasks } }) {
  // State Vars
  const [formData, setFormData] = useState(task);

  // updates the form data on every new task
  useEffect(() => {
    setFormData(task);
  }, [task]);

  /**
   * Changes the specific value in FormData state variable
   * @param {Event} e
   */
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div id='input-modal' className='w-full px-4 py-2'>
      <Dialog open={open} handler={handleDialog}>
        <DialogHeader>Task Details</DialogHeader>

        <DialogBody>
          <form
            id='task-inputForm'
            className='flex flex-col gap-3'
            onSubmit={(e) => {
              e.preventDefault();
              updateTasks(formData);
              handleDialog();
            }}>
            <Input
              type='text'
              label='Task Name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Textarea
              label='Task Description'
              name='desc'
              value={formData.desc}
              onChange={handleChange}
            />

            <Select
              label='Task Priority'
              value={formData.priority}
              color={PCOLOR[formData.priority]}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  priority: e,
                });
              }}>
              {PRIORITY.map((pri, index) => (
                <Option key={index} value={`${index}`}>
                  <span
                    className={`font-bold text-${
                      PCOLOR[formData.priority]
                    }-900`}>
                    {pri}
                  </span>
                </Option>
              ))}
            </Select>
            <div className='flex gap-4 justify-end'>
              <Button
                variant='text'
                type='reset'
                color='red'
                onClick={handleDialog}
                className='mr-1 border-2'>
                <span>Cancel</span>
              </Button>
              <Button variant='gradient' type='submit' color='green'>
                <span>Submit</span>
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default InputModal;
