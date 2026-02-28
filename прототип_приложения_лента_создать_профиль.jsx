import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Home,
  Plus,
  User,
  MapPin,
  Search,
  Heart,
  MessageCircle,
  Bookmark,
  Image as ImageIcon,
  Send,
  Settings,
  Users,
  UserPlus,
  AlertCircle,
  X,
  ArrowLeft,
  MoreHorizontal,
  Sparkles,
  Palette,
  Music2,
  Scissors,
  Ticket,
  Receipt,
  Quote,
} from "lucide-react";

const avatarUrl =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=80";

const mapBg =
  "https://imagetolink.woopicx.com/2453/930d1c3e46e5.png";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ icon: Icon, value, label }) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-[22px] border border-[#EDE2D3] bg-white/75 px-3 py-2 shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#17364A]/[0.06]">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 leading-tight">
        <div className="text-sm font-semibold tabular-nums text-[#17364A]">{value}</div>
        <div className="max-w-[72px] truncate text-[11px] text-[#6D7F8A]">
          {label}
        </div>
      </div>
    </div>
  );
}


function PhoneShell({ children, bottom }) {
  return (
    <div className="min-h-screen w-full bg-[#F6F1E7]">
      <div className="mx-auto min-h-screen w-full max-w-[420px]">
        <div className="relative min-h-screen overflow-hidden">
          {children}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F6F1E7] to-transparent" />
          {bottom}
        </div>
      </div>
    </div>
  );
}

function BottomNav({ active, setActive }) {
  const items = [
    { key: "feed", icon: Home, label: "Лента" },
    { key: "create", icon: Plus, label: "Создать" },
    { key: "profile", icon: User, label: "Профиль" },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-30">
      <div className="mx-auto w-full max-w-[420px] px-5 pb-6">
        <div className="relative rounded-[26px] border border-[#EDE2D3] bg-white/85 shadow-lg backdrop-blur">
          <div className="grid grid-cols-3 px-2 py-2">
            {items.map(({ key, icon: Icon, label }) => {
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={cx(
                    "group relative flex flex-col items-center justify-center gap-1 rounded-[22px] px-2 py-2 transition",
                    isActive ? "" : "hover:bg-[#17364A]/[0.06]"
                  )}
                >
                  {key === "create" ? (
                    <div
                      className={cx(
                        "grid h-12 w-12 place-items-center rounded-[22px] shadow-[0_8px_24px_rgba(23,54,74,0.08)] transition",
                        isActive
                          ? "bg-[#17364A] text-white"
                          : "bg-[#6FA08B] text-white group-hover:brightness-95"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  ) : (
                    <div
                      className={cx(
                        "grid h-11 w-11 place-items-center rounded-[22px] transition",
                        isActive ? "bg-[#17364A] text-white" : "bg-[#17364A]/[0.06]"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <div
                    className={cx(
                      "text-[11px] font-medium",
                      isActive ? "text-[#17364A]" : "text-[#4C6676]"
                    )}
                  >
                    {label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mx-auto mt-3 h-1.5 w-32 rounded-full bg-black/10" />
      </div>
    </div>
  );
}

function FeedCard({ post, onLike, onSave }) {
  const hasQa = Boolean(
    post?.qa?.favorite ||
      post?.qa?.feeling ||
      post?.qa?.learning ||
      post?.qa?.emotion ||
      post?.qa?.color
  );

  return (
    <Card className="overflow-hidden rounded-[26px] border-[#EDE2D3] bg-white/85 shadow-[0_8px_24px_rgba(23,54,74,0.08)] backdrop-blur">
      <CardContent className="p-0">
        {/* Header */}
        <div className="px-4 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[22px] bg-[#6FA08B]/20">
                <span className="text-[#17364A]">✦</span>
              </div>

              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <div className="truncate text-sm font-semibold text-[#17364A]">
                    @{post.handle || post.author}
                  </div>
                  <div className="text-[11px] text-[#6D7F8A]">{post.country || ""}</div>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#6D7F8A]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="truncate">{post.location}</span>
                  </span>
                  <span className="opacity-60">•</span>
                  <span>{post.time}</span>
                </div>

                {post.song ? (
                  <div className="mt-1 text-[12px] text-[#6D7F8A]">
                    {post.song}
                  </div>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSave(post.id)}
              className={cx(
                "grid h-10 w-10 shrink-0 place-items-center rounded-[22px] border border-[#EDE2D3] bg-white/75 shadow-[0_8px_24px_rgba(23,54,74,0.08)] transition hover:brightness-95",
                post.saved ? "text-[#17364A]" : "text-[#4C6676]"
              )}
              aria-label="Сохранить"
            >
              <Bookmark className={cx("h-4 w-4", post.saved ? "fill-current" : "")} />
            </button>
          </div>
        </div>

        {/* Photo (optional) */}
        {post.image ? (
          <div className="mt-3">
            <img src={post.image} alt="post" className="h-56 w-full object-cover" />
          </div>
        ) : null}

        {/* Content */}
        <div className="px-4 pb-4 pt-3">
          {!hasQa ? (
            <div className="text-[14px] leading-relaxed text-[#223F54]">
              {post.title ? <span className="font-semibold">{post.title}</span> : null}
              {post.title && post.text ? <span className="text-[#4C6676]"> — </span> : null}
              {post.text ? <span className="text-[#4C6676]">{post.text}</span> : null}
            </div>
          ) : (
            <div className="space-y-3">
              {post.title ? (
                <div className="text-[14px] font-semibold text-[#17364A]">{post.title}</div>
              ) : null}

              {post?.qa?.favorite ? (
                <div>
                  <div className="text-[12px] font-medium text-[#6D7F8A]">
                    Your favourite memory from the trip?
                  </div>
                  <div className="mt-1 text-[14px] leading-relaxed text-[#4C6676]">
                    {post.qa.favorite}
                  </div>
                </div>
              ) : null}

              {post?.qa?.feeling ? (
                <div>
                  <div className="text-[12px] font-medium text-[#6D7F8A]">
                    What are you feeling now?
                  </div>
                  <div className="mt-1 text-[14px] leading-relaxed text-[#4C6676]">
                    {post.qa.feeling}
                  </div>
                </div>
              ) : null}

              {post?.qa?.learning ? (
                <div>
                  <div className="text-[12px] font-medium text-[#6D7F8A]">Чему ты научилась?</div>
                  <div className="mt-1 text-[14px] leading-relaxed text-[#4C6676]">{post.qa.learning}</div>
                </div>
              ) : null}

              {post?.qa?.emotion ? (
                <div>
                  <div className="text-[12px] font-medium text-[#6D7F8A]">Какая эмоция осталась?</div>
                  <div className="mt-1 text-[14px] leading-relaxed text-[#4C6676]">{post.qa.emotion}</div>
                </div>
              ) : null}

              {post?.qa?.color ? (
                <div>
                  <div className="text-[12px] font-medium text-[#6D7F8A]">
                    С каким цветом ассоциируется город?
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-[22px] border border-[#EDE2D3] bg-white/75 px-3 py-2 text-sm text-[#2B4B60] shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
                    <span className="h-4 w-4 rounded-full border border-white shadow" style={{ backgroundColor: post.qa.color }} />
                    <span className="font-medium">{post.qa.color}</span>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => onLike(post.id)}
              className={cx(
                "flex items-center gap-2 rounded-[22px] border border-[#EDE2D3] bg-white/75 px-3 py-2 text-sm shadow-[0_8px_24px_rgba(23,54,74,0.08)] transition hover:brightness-95",
                post.liked ? "text-rose-600" : "text-[#2B4B60]"
              )}
            >
              <Heart className={cx("h-4 w-4", post.liked ? "fill-current" : "")} />
              <span className="text-xs font-semibold">{post.likes}</span>
            </button>

            <button className="flex items-center gap-2 rounded-[22px] border border-[#EDE2D3] bg-white/75 px-3 py-2 text-sm text-[#2B4B60] shadow-[0_8px_24px_rgba(23,54,74,0.08)] transition hover:brightness-95">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-semibold">{post.comments}</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FeedScreen({ posts, setQuery, query, onLike, onSave }) {
  const [showTip, setShowTip] = useState(true);

  return (
    <div className="px-5 pb-32">
      {/* Search */}
      <div className="mt-2 rounded-[26px] border border-[#EDE2D3] bg-white/75 p-3 shadow-[0_8px_24px_rgba(23,54,74,0.08)] backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="grid h-11 w-11 place-items-center rounded-[22px] bg-[#17364A]/[0.06]">
            <Search className="h-5 w-5 text-[#2B4B60]" />
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по локациям, людям…"
            className="h-11 rounded-[22px] border-[#E6D6C1] bg-white/75"
          />
        </div>
      </div>

      {/* Tip under search */}
      {showTip ? (
        <div className="mt-3 rounded-[26px] border border-[#E6D6C1] bg-[#F0C56B]/20 p-4 shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[22px] bg-white/70">
              <AlertCircle className="h-5 w-5 text-[#17364A]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-[#17364A]">Подсказка</div>
              <div className="mt-1 text-[13px] leading-relaxed text-[#2B4B60]">
                Нажми «Создать» внизу и добавь пост — он появится в ленте у твоих друзей!
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowTip(false)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-[22px] bg-white/70 text-[#17364A] transition hover:brightness-95"
              aria-label="Закрыть подсказку"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Posts */}
      <div className="mt-5 space-y-4">
        {posts.map((p) => (
          <FeedCard key={p.id} post={p} onLike={onLike} onSave={onSave} />
        ))}
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
                  quote: draft.quote || "“Город оставил во мне тёплый след.”",
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

function GalleryScreen({ posts, onBack }) {
  const images = posts
    .map((p) => p.image)
    .filter(Boolean)
    .slice();

  return (
    <div className="px-5 pb-32">
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="grid h-10 w-10 place-items-center rounded-[22px] border border-[#EDE2D3] bg-white/75 text-[#17364A] shadow-[0_8px_24px_rgba(23,54,74,0.08)]"
          aria-label="Назад"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="text-lg font-semibold text-[#17364A]">Галерея</div>
      </div>

      {images.length ? (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="overflow-hidden rounded-[18px] border border-[#EDE2D3] bg-white/70 shadow-[0_8px_24px_rgba(23,54,74,0.08)]"
            >
              <img src={src} alt="media" className="h-28 w-full object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-[26px] border border-[#EDE2D3] bg-white/70 p-4 text-[13px] text-[#6D7F8A] shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
          Пока нет медиа. Добавь фото в пост — оно появится здесь.
        </div>
      )}
    </div>
  );
}

function MapFullScreen({ onBack }) {
  return (
    <div className="px-5 pb-32">
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="grid h-10 w-10 place-items-center rounded-[22px] border border-[#EDE2D3] bg-white/75 text-[#17364A] shadow-[0_8px_24px_rgba(23,54,74,0.08)]"
          aria-label="Назад"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="text-lg font-semibold text-[#17364A]">Карта</div>
      </div>

      <div className="mt-4 overflow-hidden rounded-[26px] border border-[#EDE2D3] bg-white/70 shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
        <img src={mapBg} alt="map" className="h-[520px] w-full object-cover" />
      </div>
    </div>
  );
}

function TimelineScreen({ onBack }) {
  const groups = [
    {
      year: "2025",
      items: [
        { country: "Georgia", flag: "🇬🇪", date: "Aug, 2025", mode: "plane" },
        { country: "Lithuania", flag: "🇱🇹", date: "Mar, 2025", mode: "bus" },
        { country: "France", flag: "🇫🇷", date: "Mar, 2025", mode: "plane" },
        { country: "Poland", flag: "🇵🇱", date: "Jan, 2025", mode: "plane" },
        { country: "Belarus", flag: "🇧🇾", date: "Jan, 2025", mode: "bus" },
        { country: "Hungary", flag: "🇭🇺", date: "Jan, 2025", mode: "train" },
      ],
    },
    {
      year: "2024",
      items: [{ country: "Lithuania", flag: "🇱🇹", date: "Dec, 2024", mode: "bus" }],
    },
  ];

  const modeIcon = (m) => {
    // using existing icons to avoid new imports
    if (m === "plane") return "✈️";
    if (m === "train") return "🚆";
    return "🚌";
  };

  return (
    <div className="px-5 pb-32">
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="grid h-10 w-10 place-items-center rounded-[22px] border border-[#EDE2D3] bg-white/75 text-[#17364A] shadow-[0_8px_24px_rgba(23,54,74,0.08)]"
          aria-label="Назад"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="text-lg font-semibold text-[#17364A]">Таймлайн</div>
      </div>

      <div className="mt-4 overflow-hidden rounded-[26px] border border-[#EDE2D3] bg-white/65 shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-6 top-0 h-full w-px bg-[#17364A]/10" />

          <div className="divide-y divide-[#EDE2D3]">
            {groups.map((g) => (
              <div key={g.year}>
                <div className="px-6 py-4">
                  <div className="text-[28px] font-semibold tracking-tight text-[#17364A]/20">
                    {g.year}
                  </div>
                </div>

                <div className="px-4 pb-2">
                  {g.items.map((it, idx) => (
                    <div
                      key={`${g.year}-${it.country}-${idx}`}
                      className="relative flex items-start gap-3 rounded-[22px] px-2 py-3"
                    >
                      {/* dot */}
                      <div className="relative z-10 mt-1.5 ml-1.5 h-3 w-3 rounded-full bg-[#F0C56B] shadow-[0_6px_16px_rgba(240,197,107,0.35)]" />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-[18px] leading-none">{it.flag}</div>
                          <div className="truncate text-[16px] font-semibold text-[#F0C56B]">
                            {it.country}
                          </div>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[13px] text-[#9AA6AE]">
                          <span className="text-[13px]">{modeIcon(it.mode)}</span>
                          <span>{it.date}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-[22px] text-[#9AA6AE] hover:bg-[#17364A]/[0.06]"
                        aria-label="Меню"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ posts, onOpen }) {
  const [expanded, setExpanded] = useState(false);

  const bio =
    "Собираю путешествия в воспоминания: эмоции, фото, музыка и маленькие выводы о себе. Люблю красивые коллажи и тёплые маршруты.";

  return (
    <div className="pb-32">
      <div className="relative">
        {/* Map background */}
        <div className="absolute inset-x-0 top-0 h-72 overflow-hidden">
          <img src={mapBg} alt="map" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#F6F1E7]" />
        </div>

        {/* Profile content */}
        <div className="relative pt-40">
          <div className="px-5">
            <div className="rounded-[26px] border border-[#EDE2D3] bg-white/85 p-4 shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
              <div className="flex items-start gap-3">
                <div className="h-16 w-16 overflow-hidden rounded-[26px] border border-[#EDE2D3] bg-white/70 shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
                  <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[16px] font-semibold text-[#17364A]">Варя</div>
                  <div className="mt-1 text-[12px] text-[#6D7F8A]">@varya</div>

                  <div className="mt-2">
                    <div
                      className={cx(
                        "text-[13px] leading-relaxed text-[#4C6676]",
                        expanded ? "" : "line-clamp-1"
                      )}
                    >
                      {bio}
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => !v)}
                      className="mt-1 text-[12px] font-semibold text-[#17364A]"
                    >
                      {expanded ? "Свернуть" : "Показать полностью"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button className="h-12 w-full rounded-full bg-[#F0C56B] text-[#17364A] shadow-[0_8px_24px_rgba(23,54,74,0.10)] hover:brightness-95">
                  Добавить в друзья
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => onOpen("timeline")}>
                  <Pill icon={MapPin} value={12} label="поездок" />
                </button>
                <button type="button" onClick={() => onOpen("map")}>
                  <Pill icon={Users} value={8} label="стран" />
                </button>
                <button type="button" onClick={() => onOpen("gallery")}>
                  <Pill icon={ImageIcon} value={36} label="медиа" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 px-5">
        <div className="text-sm font-semibold text-[#17364A]">Недавние посты</div>
        <div className="mt-3 space-y-4">
          {posts.map((p) => (
            <FeedCard key={p.id} post={p} onLike={() => {}} onSave={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("feed");
  const [query, setQuery] = useState("");
  const [profileView, setProfileView] = useState("profile"); // profile | gallery | map | timeline

  const [posts, setPosts] = useState([
    {
      id: "p1",
      author: "Варя",
      handle: "varya",
      country: "ES",
      location: "Малага, Испания",
      time: "2 д назад",
      song: "Trip playlist — 12 tracks",
      title: "Солнечный день",
      text: "Гуляла по набережной и вдруг почувствовала: я правда здесь. Не в планах, а в реальности.",
      image:
        "https://images.unsplash.com/photo-1526406915894-6c228685b3c7?auto=format&fit=crop&w=1200&q=80",
      likes: 18,
      comments: 3,
      liked: false,
      saved: false,
    },
    {
      id: "p2",
      author: "Варя",
      handle: "varya",
      country: "IT",
      location: "Милан, Италия",
      time: "1 нед назад",
      song: "Cigarettes After Sex — Apocalypse",
      title: "Про себя",
      text: "",
      qa: {
        learning: "Давать себе больше времени и не гнаться.",
        emotion: "вдохновение",
        color: "#17364A",
        inspired: "Витрины, типографика и вечерний свет.",
      },
      image: "",
      likes: 9,
      comments: 1,
      liked: false,
      saved: true,
    },
  ]);

  const [draft, setDraft] = useState({
    title: "",
    text: "",
    location: "Москва, Россия",
    tags: "прогулка, еда",
    imageUrl: "",
    quote: "",
    collageMode: "manual", // manual | ai
    song: "",

    // mini-test
    selectedQuestions: [],
    learning: "",
    emotion: "",
    color: "",
    inspired: "",
    takeaway: "",
  });

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.location, p.author, p.title, p.text, p.song]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [posts, query]);

  const onLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const onSave = (id) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)));
  };

  const onCreate = (d) => {
    const sel = new Set(d.selectedQuestions || []);
    const qa = {
      learning: sel.has("learning") ? (d.learning || "").trim() : "",
      emotion: sel.has("emotion") ? (d.emotion || "").trim() : "",
      color: sel.has("color") ? (d.color || "").trim() : "",
      inspired: sel.has("inspired") ? (d.inspired || "").trim() : "",
      takeaway: sel.has("takeaway") ? (d.takeaway || "").trim() : "",
    };
    const hasQa = Object.values(qa).some((v) => String(v).trim().length > 0);

    const newPost = {
      id: `p_${Date.now()}`,
      author: "Варя",
      handle: "varya",
      country: "",
      location: d.location || "Без локации",
      time: "только что",
      song: (d.song || "").trim(),
      title: (d.title || "").trim(),
      text: (d.text || "").trim(),
      qa: hasQa ? qa : undefined,
      image: (d.imageUrl || "").trim(),
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
    };

    setPosts((prev) => [newPost, ...prev]);
    setTab("feed");

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

  const bottom = <BottomNav active={tab} setActive={setTab} />;

  return (
    <PhoneShell bottom={bottom}>
      {tab === "feed" ? (
        <FeedScreen posts={filteredPosts} setQuery={setQuery} query={query} onLike={onLike} onSave={onSave} />
      ) : tab === "create" ? (
        <CreateScreen onCreate={onCreate} draft={draft} setDraft={setDraft} />
      ) : profileView === "gallery" ? (
        <GalleryScreen posts={posts} onBack={() => setProfileView("profile")} />
      ) : profileView === "map" ? (
        <MapFullScreen onBack={() => setProfileView("profile")} />
      ) : profileView === "timeline" ? (
        <TimelineScreen onBack={() => setProfileView("profile")} />
      ) : (
        <ProfileScreen posts={posts} onOpen={setProfileView} />
      )}
    </PhoneShell>
  );
}
