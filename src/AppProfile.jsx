import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Heart,
  MessageCircle,
  Bookmark,
  Image as ImageIcon,
  Users,
  ArrowLeft,
  MoreHorizontal,
} from "lucide-react";

const avatarUrl =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=80";

const mapBg =
  "https://imagetolink.woopicx.com/2453/930d1c3e46e5.png";

function cx(...classes) {
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

function FeedCard({ post }) {
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
                  <div className="mt-1 text-[12px] text-[#6D7F8A]">{post.song}</div>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              className={cx(
                "grid h-10 w-10 shrink-0 place-items-center rounded-[22px] border border-[#EDE2D3] bg-white/75 shadow-[0_8px_24px_rgba(23,54,74,0.08)] transition hover:brightness-95",
                post.saved ? "text-[#17364A]" : "text-[#4C6676]"
              )}
            >
              <Bookmark className={cx("h-4 w-4", post.saved ? "fill-current" : "")} />
            </button>
          </div>
        </div>
        {post.image ? (
          <div className="mt-3">
            <img src={post.image} alt="post" className="h-56 w-full object-cover" />
          </div>
        ) : null}
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
          <div className="mt-4 flex items-center gap-2">
            <button className={cx(
              "flex items-center gap-2 rounded-[22px] border border-[#EDE2D3] bg-white/75 px-3 py-2 text-sm shadow-[0_8px_24px_rgba(23,54,74,0.08)] transition hover:brightness-95",
              post.liked ? "text-rose-600" : "text-[#2B4B60]"
            )}>
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

function GalleryScreen({ posts, onBack }) {
  const images = posts.map((p) => p.image).filter(Boolean).slice();
  return (
    <div className="px-5 pb-32">
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="grid h-10 w-10 place-items-center rounded-[22px] border border-[#EDE2D3] bg-white/75 text-[#17364A] shadow-[0_8px_24px_rgba(23,54,74,0.08)]"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="text-lg font-semibold text-[#17364A]">Галерея</div>
      </div>
      {images.length ? (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {images.map((src, i) => (
            <div key={`${src}-${i}`} className="overflow-hidden rounded-[18px] border border-[#EDE2D3] bg-white/70 shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
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
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="text-lg font-semibold text-[#17364A]">Таймлайн</div>
      </div>
      <div className="mt-4 overflow-hidden rounded-[26px] border border-[#EDE2D3] bg-white/65 shadow-[0_8px_24px_rgba(23,54,74,0.08)]">
        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-px bg-[#17364A]/10" />
          <div className="divide-y divide-[#EDE2D3]">
            {groups.map((g) => (
              <div key={g.year}>
                <div className="px-6 py-4">
                  <div className="text-[28px] font-semibold tracking-tight text-[#17364A]/20">{g.year}</div>
                </div>
                <div className="px-4 pb-2">
                  {g.items.map((it, idx) => (
                    <div key={`${g.year}-${it.country}-${idx}`} className="relative flex items-start gap-3 rounded-[22px] px-2 py-3">
                      <div className="relative z-10 mt-1.5 ml-1.5 h-3 w-3 rounded-full bg-[#F0C56B] shadow-[0_6px_16px_rgba(240,197,107,0.35)]" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-[18px] leading-none">{it.flag}</div>
                          <div className="truncate text-[16px] font-semibold text-[#F0C56B]">{it.country}</div>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[13px] text-[#9AA6AE]">
                          <span className="text-[13px]">{modeIcon(it.mode)}</span>
                          <span>{it.date}</span>
                        </div>
                      </div>
                      <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-[22px] text-[#9AA6AE] hover:bg-[#17364A]/[0.06]">
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
  const bio = "Собираю путешествия в воспоминания: эмоции, фото, музыка и маленькие выводы о себе. Люблю красивые коллажи и тёплые маршруты.";
  return (
    <div className="pb-32">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-72 overflow-hidden">
          <img src={mapBg} alt="map" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#F6F1E7]" />
        </div>
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
                    <div className={cx("text-[13px] leading-relaxed text-[#4C6676]", expanded ? "" : "line-clamp-1")}>
                      {bio}
                    </div>
                    <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-1 text-[12px] font-semibold text-[#17364A]">
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
            <FeedCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [profileView, setProfileView] = useState("profile");
  const [posts] = useState([
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
      image: "https://images.unsplash.com/photo-1526406915894-6c228685b3c7?auto=format&fit=crop&w=1200&q=80",
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

  return (
    <PhoneShell>
      {profileView === "gallery" ? (
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

