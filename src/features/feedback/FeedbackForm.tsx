"use client";

import { Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { sendFeedback } from "./api";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export function FeedbackForm() {
  const [isSending, setIsSending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    if (file) form.set("file", file);
    setIsSending(true);
    try {
      await sendFeedback(form);
      formElement.reset();
      setFile(null);
      toast.success("Сообщение отправлено. Ответ обычно приходит в течение 24 часов.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Не удалось отправить обращение");
    } finally { setIsSending(false); }
  }

  return <form onSubmit={submit} className="mt-10 flex flex-col gap-8">
    <div className="grid gap-x-15 gap-y-8 md:grid-cols-2">
      {[["name", "Имя", "Введите имя", "text"], ["companyName", "Название компании", "Введите название компании", "text"], ["email", "Email", "your@email.ru", "email"], ["phone", "Телефон", "+7 (___) ___-__-__", "tel"]].map(([name, label, placeholder, type]) => <label key={name} className="relative block"><span className="absolute -top-5 left-3 text-xs font-bold uppercase text-[#868a85]">{label}</span><input required name={name} type={type} placeholder={placeholder} className="h-17 w-full rounded-[20px] bg-white px-4 text-lg text-[#3e3c4b] shadow-[1px_1px_5px_#d4ddea] outline-none placeholder:text-[#d4ddea]" /></label>)}
    </div>
    <label className="relative block"><span className="absolute -top-5 left-3 text-xs font-bold uppercase text-[#868a85]">Сообщение</span><textarea required name="message" placeholder="Опишите ваш запрос или проблему" className="h-40 w-full resize-y rounded-[20px] bg-white px-4 py-3 text-lg text-[#3e3c4b] shadow-[1px_1px_5px_#d4ddea] outline-none placeholder:text-[#d4ddea]" /></label>
    <div><p className="text-sm text-[#a5a7b1]">Можно прикрепить скриншот, PDF, Word, Excel, txt и другие документы. До 10 МБ.</p><div className="mt-3 flex flex-wrap items-center gap-3"><button type="button" onClick={() => fileInput.current?.click()} className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-[#cdd3da] px-4 text-sm font-bold uppercase text-[#3e3c4b] shadow-[inset_0_-5px_5px_#a5a7b1,inset_0_5px_5px_white,0_4px_5px_rgba(62,60,75,.2)]"><Paperclip className="size-4" />Прикрепить файл</button><span className="text-sm text-[#a5a7b1]">{file?.name ?? "Файл не выбран"}</span></div><input ref={fileInput} className="hidden" type="file" onChange={(event) => { const next = event.target.files?.[0] ?? null; if (next && next.size > MAX_FILE_SIZE) { toast.error("Размер файла не должен превышать 10 МБ"); event.target.value = ""; return; } setFile(next); }} /></div>
    <button disabled={isSending} className="mx-auto min-h-17 w-full max-w-110 rounded-[20px] bg-[#c8ddd5] px-6 text-lg font-bold uppercase text-[#3e3c4b] shadow-[inset_0_-5px_5px_#a5a7b1,inset_0_5px_5px_white,0_4px_10px_rgba(62,60,75,.2)] disabled:opacity-60">{isSending ? "Отправка…" : "Отправить сообщение"}</button>
  </form>;
}
