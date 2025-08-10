// src/App.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Download, Mail, Github, Linkedin, Phone, ExternalLink,
  Home, FolderGit2, Send, Moon, Sun
} from "lucide-react";

/** 탭 정의 */
const TABS = [
  { id: "about", label: "소개 & 이력서", icon: Home },
  { id: "projects", label: "프로젝트", icon: FolderGit2 },
  { id: "contact", label: "연락처", icon: Mail },
] as const;
type TabId = typeof TABS[number]["id"];

/** 애니메이션 */
const fadeSlide = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.25 },
};

export default function App() {
  const [tab, setTab] = useState<TabId>("about");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isDark = theme === "dark";

  // ✅ 방법 A: 전역 .dark 클래스와 동기화 (shadcn 버튼/색 변수들이 정확히 따라감)
  useEffect(() => {
    const root = document.documentElement; // <html>
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  // 테마별 유틸 클래스
  const rootBg = isDark
    ? "bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-100"
    : "bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900";
  const panelBorder = isDark ? "border-zinc-800" : "border-zinc-200";
  const panelBg = isDark ? "bg-zinc-900/60" : "bg-zinc-50";
  const subtleText = isDark ? "text-zinc-400" : "text-zinc-500";
  const subtleText2 = isDark ? "text-zinc-300" : "text-zinc-700";
  const hoverPanel = isDark ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100";
  const separator = isDark ? "bg-zinc-800" : "bg-zinc-200";
  const selectedBtn = "bg-emerald-500 text-white hover:bg-emerald-600";
  const ghostText = isDark ? "text-zinc-100" : "text-zinc-900";
  const pointColor = isDark ? "text-emerald-400" : "text-emerald-600";

  return (
    <div className={`min-h-dvh w-full overflow-x-hidden ${rootBg}`}>
      {/* 고정 테마 토글 (우상단) */}
      <Button
        variant="outline"
        className={`${isDark ? "border-zinc-700 text-zinc-200 hover:bg-zinc-800" : "border-zinc-300 text-zinc-800 hover:bg-zinc-100"} fixed right-4 top-4 z-50 rounded-xl`}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="테마 전환"
        title="다크/라이트 모드 전환"
      >
        {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
        {isDark ? "라이트" : "다크"}
      </Button>

      {/* 프레임: 좌 16rem 고정 + 우 1fr (두 컨테이너) */}
      <div className="grid w-full min-h-screen px-0 lg:grid-cols-[16rem_minmax(0,1fr)]">
        {/* 왼쪽: 고정 사이드바 */}
        <aside className={`sticky top-14 hidden w-64 shrink-0 rounded-2xl ${panelBg} p-4 ml-4backdrop-blur lg:block border ${panelBorder} max-h-[calc(100dvh-2rem)] overflow-y-auto`}>
          <div className="flex flex-col items-center gap-3 rounded-xl p-3">
            <Avatar className="h-24 w-24 ring-2 ring-zinc-700">
              <AvatarImage src="/your-photo.jpg" alt="프로필" />
              <AvatarFallback>내사진</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className={`text-lg font-semibold ${ghostText}`}>김태윤</div>
              <div className={`text-xs ${subtleText}`}>RPA Developer</div>
            </div>
          </div>

          <Separator className={`my-1 ${separator}`} />

          <nav className="flex flex-col gap-2">
            {TABS.map(({ id, label, icon: Icon }) => {
              const active = tab === id;
              return (
                <Button
                  key={id}
                  variant="ghost" 
                  className={`justify-start gap-3 rounded-xl px-3 py-6 text-left text-sm transition-all
                    ${active
                      ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
                      : `${hoverPanel} ${ghostText} border ${panelBorder}`}`}
                  onClick={() => setTab(id)}
                >
                  <Icon className={`h-5 w-5 ${active ? "text-white" : pointColor}`} />
                  {label}
                </Button>
              );
            })}
          </nav>
          <div className="mt-auto grid gap-2">
            <Button
              variant="outline"
              className={`rounded-xl ${isDark ? "border-zinc-700 text-zinc-200 hover:bg-zinc-800" : "border-zinc-300 text-zinc-800 hover:bg-zinc-100"}`}
              asChild
            >
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                <Download className="mr-2 h-4 w-4" /> 이력서 내려받기
              </a>
            </Button>
            <div className={`flex items-center gap-2 ${subtleText}`}>
              <a href="https://github.com/yourname" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 hover:opacity-80 ${ghostText}`}>
                <Github className={`h-4 w-4 ${pointColor}`} /> GitHub
              </a>
              <span>•</span>
              <a href="https://linkedin.com/in/yourname" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 hover:opacity-80 ${ghostText}`}>
                <Linkedin className={`h-4 w-4 ${pointColor}`} /> LinkedIn
              </a>
            </div>
          </div>
        </aside>

        {/* 오른쪽: 단일 컬럼(세로로 주르륵) */}
        <main className="min-w-0 w-full overflow-x-hidden px-4 sm:px-6 lg:px-8">
          <header className="mb-6 flex items-center justify-between">
            {/* 모바일 탭 스위처만 유지 */}
            <div className="md:hidden">
              <div className={`inline-flex rounded-xl border ${isDark ? "border-zinc-700 bg-zinc-900/60" : "border-zinc-300 bg-white"} p-1`}>
                {TABS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`rounded-lg px-3 py-2 text-xs ${
                      tab === id
                        ? isDark
                          ? "bg-zinc-100 text-zinc-900"
                          : "bg-zinc-900 text-zinc-100"
                        : isDark
                        ? "text-zinc-300"
                        : "text-zinc-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {tab === "about" && (
              <motion.section key="about" {...fadeSlide}>
                <AboutSection isDark={isDark} panelBg={panelBg} panelBorder={panelBorder} subtleText={subtleText} subtleText2={subtleText2} />
              </motion.section>
            )}
            {tab === "projects" && (
              <motion.section key="projects" {...fadeSlide}>
                <ProjectsOneColumn isDark={isDark} panelBg={panelBg} panelBorder={panelBorder} subtleText={subtleText} />
              </motion.section>
            )}
            {tab === "contact" && (
              <motion.section key="contact" {...fadeSlide}>
                <ContactOneColumn isDark={isDark} panelBg={panelBg} panelBorder={panelBorder} subtleText={subtleText} subtleText2={subtleText2} />
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/** 소개 섹션 (세로 정렬 버전) */
function AboutSection({ isDark, panelBg, panelBorder, subtleText, subtleText2 }: any) {
  return (
    <div className="grid gap-6 p-4 sm:p-6 lg:p-8">
      {/* 소개 */}
      <Card className={`rounded-2xl border ${panelBorder} ${panelBg}`}>
        <CardHeader>
          <CardTitle className="text-xl">소개</CardTitle>
            <CardDescription className={subtleText}>자기소개와 강점, 관심 분야를 간단히 적어보세요.</CardDescription>
        </CardHeader>
        <CardContent className={`grid gap-4 leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
          <p>
            안녕하세요, RPA 개발자 <span className="font-semibold">김태윤</span>입니다. RPA 개발을 하고 있으며, AI와 접목시키는데 관심이 많습니다.
          </p>
          <ul className="grid gap-2 text-sm">
            <li className="flex items-center gap-2"><Badge variant="secondary">솔루션</Badge> Brity, A360, Blue Prism</li>
            <li className="flex items-center gap-2"><Badge variant="secondary">주 언어</Badge> Spring Boot, Python, VUE</li>
            <li className="flex items-center gap-2"><Badge variant="secondary">관심사</Badge> n8n, RAG, DB</li>
          </ul>
        </CardContent>
      </Card>

      {/* 핵심 스킬 */}
      <Card className={`rounded-2xl border ${panelBorder} ${panelBg}`}>
        <CardHeader>
          <CardTitle className="text-xl">핵심 스킬</CardTitle>
          <CardDescription className={subtleText}>자주 쓰는 기술과 툴</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
          {["React", "Next.js", "Tailwind", "Spring Boot", "JPA", "MySQL", "Docker", "n8n", "AWS", "GitHub Actions"].map(
            (s) => (
              <div key={s} className={`rounded-lg border ${panelBorder} ${isDark ? "bg-zinc-900" : "bg-white"} px-3 py-2`}>
                {s}
              </div>
            )
          )}
        </CardContent>
        {/*<CardFooter className={`text-xs ${subtleText}`}>* 필요에 맞게 항목을 바꾸세요.</CardFooter> */}
      </Card>

      {/* 경력 요약 */}
      <Card className={`rounded-2xl border ${panelBorder} ${panelBg}`}>
        <CardHeader>
          <CardTitle className="text-xl">경력 요약</CardTitle>
        </CardHeader>
        <CardContent className={`grid gap-4 text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
          <TimelineItem isDark={isDark} panelBorder={panelBorder} panelBg={panelBg} period="2023 – 현재" title="국비 · 패스트 캠퍼스" detail="백엔드 개발자" />
          <TimelineItem isDark={isDark} panelBorder={panelBorder} panelBg={panelBg} period="2021 – 2023" title="메타넷 글로벌 · RPA 엔지니어" detail="자동화 파이프라인 구축, 운영 효율 30% 개선" />
        </CardContent>
      </Card>

      {/* 자격·수상 */}
      <Card className={`rounded-2xl border ${panelBorder} ${panelBg}`}>
        <CardHeader>
          <CardTitle className="text-xl">자격·수상</CardTitle>
        </CardHeader>
        <CardContent className={`grid gap-2 text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
          <div className={`rounded-lg border ${panelBorder} ${isDark ? "bg-zinc-900" : "bg-white"} p-3`}>SQLD</div>
          <div className={`rounded-lg border ${panelBorder} ${isDark ? "bg-zinc-900" : "bg-white"} p-3`}>정보처리기능사</div>
          <div className={`rounded-lg border ${panelBorder} ${isDark ? "bg-zinc-900" : "bg-white"} p-3`}>BluePrism자격증</div>
        </CardContent>
      </Card>
    </div>
  );
}

function TimelineItem({ isDark, panelBorder, panelBg, period, title, detail }: any) {
  return (
    <div className={`grid gap-1 rounded-xl border ${panelBorder} ${panelBg} p-4`}>
      <div className={`text-xs uppercase tracking-wide ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{period}</div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-sm">{detail}</div>
    </div>
  );
}

/** 프로젝트: 1열 세로 리스트 */
function ProjectsOneColumn({ isDark, panelBg, panelBorder, subtleText }: any) {
  const projects = [
    {
      title: "LoL 사용자 게임 자동 팀매칭 봇",
      desc: "Discord 명령어로 참가자 정보를 수집하고, 자동 팀매칭과 라인별 챔피언 추천을 수행하는 봇",
      stack: ["Node.js", "Discord.js", "Python", "n8n"],
      link: "https://github.com/yourname/lol-autoteam",
    },
    {
      title: "Perfume Info Collector",
      desc: "브랜드/향수명을 입력하면 노트를 크롤링/정제해 Google Sheet에 자동 기록",
      stack: ["Node.js", "n8n", "Google Sheets API"],
      link: "https://github.com/yourname/perfume-info-collector",
    },
    {
      title: "RPA 운영 대시보드",
      desc: "Blue Prism/Brity 작업 현황을 시각화하고 알림까지 자동화한 내부 대시보드",
      stack: ["Spring Boot", "React", "MySQL", "Docker"],
      link: "https://github.com/yourname/rpa-dashboard",
    },
  ];

  return (
    <div className="grid gap-6 p-4 sm:p-6 lg:p-8">
      {projects.map((p) => (
        <Card key={p.title} className={`rounded-2xl border ${panelBorder} ${panelBg}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              {p.title}
              <a href={p.link} target="_blank" rel="noreferrer" className="opacity-70 transition hover:opacity-100" aria-label="프로젝트 링크 열기">
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardTitle>
            <CardDescription className={subtleText}>{p.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((tag) => (
                <Badge key={tag} variant="secondary" className={`${isDark ? "bg-zinc-800 text-zinc-200" : "bg-zinc-100 text-zinc-800"}`}>
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/** 연락처: 1열로 폼 → 링크 카드 순서대로 세로 나열 */
function ContactOneColumn({ isDark, panelBg, panelBorder, subtleText, subtleText2 }: any) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
    };
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent(`[포트폴리오 문의] ${name}`);
    const body = encodeURIComponent(`${message}\n\n— From: ${name} <${email}>`);
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="grid gap-6 p-4 sm:p-6 lg:p-8">
      <Card className={`rounded-2xl border ${panelBorder} ${panelBg}`}>
        <CardHeader>
          <CardTitle className="text-xl">연락하기</CardTitle>
          <CardDescription className={subtleText}>이력서를 보고 문의를 남겨주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="name" className={`text-sm ${subtleText2}`}>이름</label>
                <Input id="name" name="name" placeholder="홍길동" required className={`${isDark ? "bg-zinc-950/60 border-zinc-800" : "bg-white border-zinc-300"}`} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className={`text-sm ${subtleText2}`}>이메일</label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required className={`${isDark ? "bg-zinc-950/60 border-zinc-800" : "bg-white border-zinc-300"}`} />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className={`text-sm ${subtleText2}`}>메시지</label>
              <Textarea id="message" name="message" placeholder="프로젝트 제안/문의 내용을 적어주세요" className={`min-h-[140px] ${isDark ? "bg-zinc-950/60 border-zinc-800" : "bg-white border-zinc-300"}`} />
            </div>
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-3 text-sm ${subtleText}`}>
                <Phone className="h-4 w-4" /> 010-0000-0000
                <span>•</span>
                <Mail className="h-4 w-4" /> you@example.com
              </div>
              <Button type="submit" className="rounded-xl">보내기</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className={`rounded-2xl border ${panelBorder} ${panelBg}`}>
        <CardHeader>
          <CardTitle className="text-xl">이력서 링크</CardTitle>
          <CardDescription className={subtleText}>PDF나 노션 링크를 연결하세요.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button variant="secondary" className="justify-start rounded-xl" asChild>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              <Download className="mr-2 h-4 w-4" /> PDF 이력서 열기
            </a>
          </Button>
          <Button
            variant="outline"
            className={`${isDark ? "border-zinc-700 text-zinc-200 hover:bg-zinc-800" : "border-zinc-300 text-zinc-800 hover:bg-zinc-100"} justify-start rounded-xl`}
            asChild
          >
            <a href="https://www.notion.so/your-resume" target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> 노션 이력서 보기
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
