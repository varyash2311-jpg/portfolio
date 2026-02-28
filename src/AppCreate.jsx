import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Image as ImageIcon,
  MoreHorizontal,
  Sparkles,
  Palette,
  Music2,
  Quote,
} from "lucide-react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PhoneShell({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#F6F1E7]">
      <div className="mx-auto min-h-screen w-full max-w-[420px]">
        <div className="relative min-h-screen overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

function CreateScreen({ onCreate, draft, setDraft }) {
  const canPublish = draft.location.trim().length > 0;

  const emotions = [
    "радость",
    "спокойствие",
    "вдохновение",
    "ностальгия",
    "адреналин",
    "умиротворение",
    "интерес",
    "смелость",
  ];

  const colors = [
    "#F0C56B",
    "#6FA08B",
    "#17364A",
    "#E6D6C1",
    "#B86B77",
    "#6D7F8A",
    "#223F54",
    "#F6F1E7",
  ];

  const questions = [
    {
      key: "learning",
      title: "Чему ты научилась?",
      helper: "коротко, в одну мысль",
      type: "text",
      placeholder: "Например: не бояться спрашивать дорогу",
    },
    {
      key: "emotion",
      title: "Какая эмоция осталась?",
      helper: "можно выбрать из списка",
      type: "emotion",
    },
    {
      key: "color",
      title: "С каким цветом ассоциируется город?",
      helper: "выбери оттенок",
      type: "color",
    },
    {
      key: "inspired",
      title: "Что вдохновило?",
      helper: "люди, еда, улицы, музыка…",
      type: "text",
      placeholder: "Например: утренние рынки и запах кофе",
    },
    {
      key: "takeaway",
      title: "Главный вывод о себе",
      helper: "что ты поняла о себе в этой поездке",
      type: "text",
      placeholder: "Например: мне важно больше тишины и прогулок",
    },
  ];

  const selected = new Set(draft.selectedQuestions || []);
  const toggleQ = (key) => {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setDraft({ ...draft, selectedQuestions: Array.from(next) });
  };

  const setAnswer = (key, value) => {
    setDraft({ ...draft, [key]: value });
  };

  return (
    <div className="px-5 pb-32">
      <div className="mt-2">
        <div className="text-lg font-semibold text-[#17364A]">Создать пост</div>
        <div className="mt-1 text-sm text-[#6D7F8A]">
          Собери фото, цитату и ответы на любые вопросы — получится страница путешествия.
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {/* Место */}
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm font-medium text-[#2B4B60]">
            <MapPin className="h-4 w-4" /> <span>Место</span>
          </div>
          <Input
            value={draft.location}
            onChange={(e) => setDraft({ ...draft, location: e.target.value })}
            placeholder="Город, страна"
            className="h-12 rounded-[22px] border-[#E6D6C1] bg-white/85"
          />
        </div>

        {/* Визуальные воспоминания */}
        <div>
          <div className="mb-2 text-sm font-medium text-[#2B4B60]">Визуальные воспоминания</div>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() =>
                setDraft({
                  ...draft,
                  imageUrl:
                    draft.imageUrl ||
                    "https://images.unsplash.com/photo-1549877452-9c387954fbc8?auto=format&fit=crop&w=1200&q=80",
                })
              }
              className="flex flex-col items-center justify-center gap-2 rounded-[22px] border-2 border-dashed border-[#7FAE9B] bg-[#EFE6DB] py-5 text-sm text-[#2B4B60]"
            >
              <ImageIcon className="h-5 w-5" />
              Фото
            </button>

            <button
              type="button"
              onClick={() =>
                setDraft({
                  ...draft,
                  quote: draft.quote || '"Город оставил во мне тёплый след."',
                })
              }
              className="flex flex-col items-center justify-center gap-2 rounded-[22px] border-2 border-dashed border-[#E6D6C1] py-5 text-sm text-[#2B4B60]"
            >
              <Quote className="h-5 w-5" />
              Цитата
            </button>

            <button
              type="button"
              onClick={() =>
                setDraft({
                  ...draft,
                  collageMode: draft.collageMode === "manual" ? "ai" : "manual",
                })
              }
              className={cx(
                "flex flex-col items-center justify-center gap-2 rounded-[22px] border-2 border-dashed py-5 text-sm",
                draft.collageMode === "ai"
                  ? "border-[#6FA08B] bg-[#6FA08B]/15 text-[#2B4B60]"
                  : "border-[#E6D6C1] text-[#2B4B60]"
              )}
              aria-label="Сделать коллаж"
            >
              <Sparkles className="h-5 w-5" />
              Коллаж
            </button>
          </div>

          {(draft.imageUrl || draft.quote) ? (
            <div className="mt-3 overflow-hidden rounded-[26px] border border-[#EDE2D3] bg-white/70 shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
              {draft.imageUrl ? (
                <img src={draft.imageUrl} alt="preview" className="h-40 w-full object-cover" />
              ) : null}
              <div className="px-4 py-3">
                {draft.quote ? (
                  <div className="text-[13px] italic text-[#2B4B60]">{draft.quote}</div>
                ) : (
                  <div className="text-[12px] text-[#6D7F8A]">Добавь цитату — она появится здесь</div>
                )}
                <div className="mt-2 text-[11px] text-[#6D7F8A]">
                  {draft.collageMode === "ai" ? "AI собирает эстетичную композицию" : "Ручной режим коллажа"}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Музыка */}
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm font-medium text-[#2B4B60]">
            <Music2 className="h-4 w-4" /> <span>Плейлист поездки</span>
          </div>
          <Input
            value={draft.song}
            onChange={(e) => setDraft({ ...draft, song: e.target.value })}
            placeholder="Песня или плейлист"
            className="h-12 rounded-[22px] border-[#E6D6C1] bg-white/85"
          />
        </div>

        {/* Заметки */}
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm font-medium text-[#2B4B60]">
            ✍️ <span>Заметки</span>
          </div>
          <Textarea
            value={draft.text}
            onChange={(e) => setDraft({ ...draft, text: e.target.value })}
            placeholder="Что запомнилось?"
            className="min-h-[120px] rounded-[22px] border-[#E6D6C1] bg-white/85"
          />
        </div>

        {/* Мини-тест */}
        <Card className="rounded-[26px] border-[#EDE2D3] bg-white/85 shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-[#17364A]">Мини-тест после поездки</div>
                <div className="mt-1 text-[12px] text-[#6D7F8A]">Выбери вопросы, на которые хочешь ответить</div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-[22px] bg-[#17364A]/[0.06]">
                <Palette className="h-5 w-5 text-[#17364A]" />
              </div>
            </div>

            {/* chooser */}
            <div className="mt-4 flex flex-wrap gap-2">
              {questions.map((q) => {
                const active = selected.has(q.key);
                return (
                  <button
                    key={q.key}
                    type="button"
                    onClick={() => toggleQ(q.key)}
                    className={cx(
                      "rounded-full border px-3 py-2 text-[12px] shadow-[0_8px_24px_rgba(23,54,74,0.08)]",
                      active
                        ? "border-[#17364A] bg-[#17364A] text-white"
                        : "border-[#EDE2D3] bg-white/75 text-[#2B4B60]"
                    )}
                  >
                    {q.title}
                  </button>
                );
              })}
            </div>

            {/* selected questions */}
            <div className="mt-5 space-y-4">
              {questions
                .filter((q) => selected.has(q.key))
                .map((q) => (
                  <div key={q.key}>
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-[12px] font-medium text-[#6D7F8A]">{q.title}</div>
                      <div className="text-[11px] text-[#6D7F8A]">{q.helper}</div>
                    </div>

                    {q.type === "text" ? (
                      <Input
                        value={draft[q.key] || ""}
                        onChange={(e) => setAnswer(q.key, e.target.value)}
                        placeholder={q.placeholder}
                        className="mt-2 h-11 rounded-[22px] border-[#E6D6C1] bg-white/85"
                      />
                    ) : q.type === "emotion" ? (
                      <div className="mt-2 relative">
                        <div className="flex gap-2 overflow-x-auto whitespace-nowrap pr-10">
                          {emotions.map((e) => {
                            const active = draft.emotion === e;
                            return (
                              <button
                                key={e}
                                type="button"
                                onClick={() => setDraft({ ...draft, emotion: active ? "" : e })}
                                className={cx(
                                  "rounded-full border px-3 py-2 text-[12px] shadow-[0_8px_24px_rgba(23,54,74,0.08)]",
                                  active
                                    ? "border-[#17364A] bg-[#17364A] text-white"
                                    : "border-[#EDE2D3] bg-white/75 text-[#2B4B60]"
                                )}
                              >
                                {e}
                              </button>
                            );
                          })}
                        </div>
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-white/85 to-transparent" />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-[22px] border border-[#EDE2D3] bg-white/75 text-[#17364A] shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
                          <MoreHorizontal className="h-4 w-4" />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 relative">
                        <div className="flex gap-2 overflow-x-auto whitespace-nowrap pr-10">
                          {colors.map((c) => {
                            const active = draft.color === c;
                            return (
                              <button
                                key={c}
                                type="button"
                                onClick={() => setDraft({ ...draft, color: active ? "" : c })}
                                className={cx(
                                  "flex items-center gap-2 rounded-full border bg-white/75 px-3 py-2 text-[12px] shadow-[0_8px_24px_rgba(23,54,74,0.08)]",
                                  active ? "border-[#17364A]" : "border-[#EDE2D3]"
                                )}
                              >
                                <span className="h-4 w-4 rounded-full border border-white shadow" style={{ backgroundColor: c }} />
                                {c}
                              </button>
                            );
                          })}
                        </div>
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-white/85 to-transparent" />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-[22px] border border-[#EDE2D3] bg-white/75 text-[#17364A] shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
                          <MoreHorizontal className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              {!selected.size ? (
                <div className="rounded-[22px] border border-[#EDE2D3] bg-white/70 px-4 py-3 text-[12px] text-[#6D7F8A]">
                  Можно пропустить тест — или выбрать 1–2 вопроса.
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Button
          disabled={!canPublish}
          onClick={() => onCreate(draft)}
          className={cx(
            "mt-1 h-12 w-full rounded-full text-white",
            canPublish ? "bg-[#17364A]" : "bg-[#9AA6AE]"
          )}
        >
          Создать страницу путешествия
        </Button>
      </div>
    </div>
  );
}

export default function App() {
  const [draft, setDraft] = useState({
    title: "",
    text: "",
    location: "Москва, Россия",
    tags: "прогулка, еда",
    imageUrl: "",
    quote: "",
    collageMode: "manual",
    song: "",
    selectedQuestions: [],
    learning: "",
    emotion: "",
    color: "",
    inspired: "",
    takeaway: "",
  });

  const onCreate = (d) => {
    alert("Пост создан! (Это демо версия)");
    setDraft({
      title: "",
      text: "",
      location: d.location || "Москва, Россия",
      tags: d.tags || "прогулка, еда",
      imageUrl: "",
      quote: "",
      collageMode: "manual",
      song: "",
      selectedQuestions: [],
      learning: "",
      emotion: "",
      color: "",
      inspired: "",
      takeaway: "",
    });
  };

  return (
    <PhoneShell>
      <CreateScreen onCreate={onCreate} draft={draft} setDraft={setDraft} />
    </PhoneShell>
  );
}

