import { baseURL } from "@/shared/api/config";

export async function sendFeedback(form: FormData) {
  const response = await fetch(`${baseURL}/feedback`, {
    method: "POST",
    credentials: "include",
    body: form,
  });
  if (!response.ok) throw new Error("Не удалось отправить обращение");
}
