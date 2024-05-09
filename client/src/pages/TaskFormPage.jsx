import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Destino</Label>
        <select name="title" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("title")}>
          <option value="Seleccione una opción" selected>Seleccione una opción</option>
          <option value="San Andrés">San Andrés</option>
          <option value="Cartagena">Cartagena</option>
          <option value="Santa Marta">Santa Marta</option>
        </select>

        <Label htmlFor="description">Descripción</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Descripción de la reserva"
          {...register("description")}
          required></Textarea>

        <Label htmlFor="date">Fecha de reserva</Label>
        <Input type="date" name="date" {...register("date")} required/>
        <Button>Registrar</Button>
      </form>
    </Card>
  );
}
