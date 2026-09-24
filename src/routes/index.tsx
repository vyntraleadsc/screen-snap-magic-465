import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileText,
  Menu,
  Search,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  academicEmptyCopy,
  discipline,
  navItems,
  quickLinks,
  utilityLinks,
  type ViewId,
} from "@/lib/odonto-data";
import { flashcards, organisms, questions, type OrganismCategory } from "@/lib/study-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ODONTO STUDY | Estudos para Odontologia" },
      { name: "description", content: "Organize seus estudos, pratique com questões e acompanhe sua evolução acadêmica em Odontologia." },
      { property: "og:title", content: "ODONTO STUDY | Estudos para Odontologia" },
      { property: "og:description", content: "Seu ambiente de estudos para Odontologia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OdontoStudy,
});

type HistoryEntry = { id: string; date: string; count: number; correct: number; seconds: number };
type SavedState = {
  name: string;
  answered: number;
  correct: number;
  wrongIds: string[];
  history: HistoryEntry[];
  flashcardRight: number;
  flashcardWrong: number;
};

const initialState: SavedState = { name: "", answered: 0, correct: 0, wrongIds: [], history: [], flashcardRight: 0, flashcardWrong: 0 };
const storageKey = "odonto-study-v1";

function OdontoStudy() {
  const [view, setView] = useState<ViewId>("inicio");
  const [state, setState] = useState<SavedState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setState({ ...initialState, ...(JSON.parse(saved) as SavedState) });
    } catch {
      setState(initialState);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [hydrated, state]);

  const navigate = (next: ViewId) => {
    if ((next === "questoes" || next === "simulados") && !state.name) {
      setShowName(true);
      return;
    }
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateState = (update: Partial<SavedState>) => setState((current) => ({ ...current, ...update }));

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background pb-24 text-foreground md:pb-0">
      <Backdrop />
      <Header name={state.name} view={view} onNavigate={navigate} onOpenProfile={() => setView("perfil")} />
      <main className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-6 sm:px-6 md:pt-10">
        {view === "inicio" && <Home name={state.name} state={state} onNavigate={navigate} />}
        {view === "disciplinas" && <Disciplines onNavigate={navigate} />}
        {view === "conteudos" && <Contents />}
        {view === "questoes" && <Questions state={state} updateState={updateState} />}
        {view === "simulados" && <Simulations state={state} updateState={updateState} onNavigate={navigate} />}
        {view === "historico" && <HistoryView history={state.history} />}
        {view === "ranking" && <Ranking state={state} />}
        {view === "flashcards" && <Flashcards state={state} updateState={updateState} />}
        {view === "revisao" && <Review state={state} updateState={updateState} />}
        {view === "progresso" && <ProgressView state={state} />}
        {view === "perfil" && <Profile state={state} updateState={updateState} />}
      </main>
      <BottomNav view={view} onNavigate={navigate} />
      {showName && <NameDialog onClose={() => setShowName(false)} onSave={(name) => { updateState({ name }); setShowName(false); setView("questoes"); }} />}
    </div>
  );
}

function Backdrop() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden"><div className="drift-slow absolute -left-40 -top-48 size-[32rem] rounded-full bg-primary/35 blur-[110px]" /><div className="drift-reverse absolute -right-44 top-16 size-[30rem] rounded-full bg-brand-violet/30 blur-[110px]" /><div className="drift-slow absolute -bottom-48 left-1/3 size-[30rem] rounded-full bg-brand-cyan/20 blur-[120px]" /></div>;
}

function Header({ name, view, onNavigate, onOpenProfile }: { name: string; view: ViewId; onNavigate: (view: ViewId) => void; onOpenProfile: () => void }) {
  const [open, setOpen] = useState(false);
  return <header className="relative z-20 border-b border-glass-border bg-background/55 backdrop-blur-2xl"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"><button onClick={() => onNavigate("inicio")} className="flex items-center gap-3" aria-label="Ir para o início"><span className="grid size-10 place-items-center rounded-2xl border border-glass-border bg-glass font-display text-lg font-extrabold">OS</span><span className="font-display text-sm font-bold sm:text-base">ODONTO STUDY</span></button><nav className="hidden items-center gap-1 md:flex">{navItems.slice(0, 4).map((item) => <button key={item.id} onClick={() => onNavigate(item.id)} className={cn("rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-glass hover:text-foreground", view === item.id && "bg-glass text-foreground")}>{item.label}</button>)}</nav><div className="flex items-center gap-2"><button onClick={onOpenProfile} className="grid size-10 place-items-center rounded-full border border-glass-border bg-glass font-display text-xs font-bold" aria-label="Abrir perfil">{name ? initials(name) : "?"}</button><Button variant="quiet" size="icon" className="md:hidden" aria-label="Abrir menu" onClick={() => setOpen(!open)}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</Button></div></div>{open && <nav className="border-t border-glass-border px-4 py-3 md:hidden">{navItems.map((item) => <button key={item.id} onClick={() => { onNavigate(item.id); setOpen(false); }} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm text-muted-foreground hover:bg-glass hover:text-foreground"><item.icon className="size-4" />{item.label}</button>)}</nav>}</header>;
}

function Home({ name, state, onNavigate }: { name: string; state: SavedState; onNavigate: (view: ViewId) => void }) {
  const accuracy = state.answered ? Math.round((state.correct / state.answered) * 100) : 0;
  return <div className="space-y-6"><section className="grid items-center gap-6 py-6 md:grid-cols-[1.2fr_0.8fr] md:py-12"><div><p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground"><Sparkles className="size-4 text-accent" />Seu ambiente de estudos para Odontologia</p><h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">{name ? <>Olá, <span className="text-primary">{firstName(name)}</span>!</> : "ODONTO STUDY"}</h1><p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Organize seus estudos, pratique com questões e acompanhe sua evolução acadêmica.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button size="lg" onClick={() => onNavigate("conteudos")}><BookOpen className="size-4" />Começar a estudar</Button><Button size="lg" variant="secondary" onClick={() => onNavigate("disciplinas")}>Ver disciplinas<ArrowRight className="size-4" /></Button></div></div><div className="glass-panel rounded-[28px] p-5"><p className="text-xs font-semibold uppercase text-muted-foreground">Seu progresso</p><div className="mt-2 flex items-end justify-between"><strong className="font-display text-5xl">{accuracy}<span className="text-2xl text-muted-foreground">%</span></strong><span className="text-sm text-muted-foreground">{state.answered} questões</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-glass"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${accuracy}%` }} /></div><div className="mt-4 grid grid-cols-3 gap-2"><Metric value={state.history.length} label="Simulados" /><Metric value={state.flashcardRight + state.flashcardWrong} label="Flashcards" /><Metric value={state.wrongIds.length} label="Revisar" /></div></div></section><section><SectionTitle title="Sua rotina de estudo" subtitle="Escolha por onde continuar" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{quickLinks.map((link) => <button key={link.id} onClick={() => onNavigate(link.id)} className="glass-panel group min-h-36 rounded-2xl p-4 text-left transition-transform hover:-translate-y-1"><span className="grid size-10 place-items-center rounded-xl bg-primary/20 text-primary"><link.icon className="size-5" /></span><strong className="mt-5 block font-display text-sm">{link.label}</strong><span className="mt-1 block text-xs text-muted-foreground">{link.description}</span></button>)}</div></section><section className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]"><button onClick={() => onNavigate("disciplinas")} className="glass-panel rounded-[28px] p-5 text-left sm:p-6"><div className="flex items-start justify-between gap-4"><span className="grid size-11 place-items-center rounded-2xl bg-primary/20 text-primary"><discipline.icon className="size-6" /></span><span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">{discipline.status}</span></div><p className="mt-6 text-xs font-semibold uppercase text-muted-foreground">Disciplina em destaque</p><h2 className="mt-1 font-display text-2xl font-bold">{discipline.title}</h2><p className="mt-2 max-w-xl text-sm text-muted-foreground">Explore conteúdos, pratique com questões e revise conceitos importantes.</p></button><div className="glass-panel rounded-[28px] p-5"><SectionTitle title="Mais opções" /><div className="mt-3 space-y-1">{utilityLinks.map((link) => <button key={link.id} onClick={() => onNavigate(link.id)} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-2 text-left text-sm text-muted-foreground hover:bg-glass hover:text-foreground"><link.icon className="size-4" /><span className="flex-1">{link.label}</span><ChevronRight className="size-4" /></button>)}</div></div></section></div>;
}

function Disciplines({ onNavigate }: { onNavigate: (view: ViewId) => void }) { return <Page title="Disciplinas" subtitle="Conteúdos organizados para sua formação"><button onClick={() => onNavigate("conteudos")} className="glass-panel w-full rounded-[28px] p-5 text-left md:max-w-2xl"><div className="flex items-center gap-4"><span className="grid size-14 place-items-center rounded-2xl bg-primary/20 text-primary"><discipline.icon className="size-7" /></span><div className="min-w-0 flex-1"><h2 className="font-display text-xl font-bold">{discipline.title}</h2><p className="mt-1 text-sm text-muted-foreground">Material disponível para leitura e prática</p></div><ChevronRight className="size-5 text-muted-foreground" /></div><span className="mt-5 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">{discipline.status}</span></button></Page>; }

function Contents() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"Todos" | OrganismCategory>("Todos");
  const filtered = organisms.filter((item) => (category === "Todos" || item.category === category) && `${item.name} ${item.who} ${item.where} ${item.how} ${item.importance}`.toLowerCase().includes(search.toLowerCase()));
  return <Page title="Conteúdos" subtitle="Microbiologia e Imunologia"><div className="glass-panel mb-5 flex items-center gap-3 rounded-2xl px-4"><Search className="size-5 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} maxLength={100} className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Buscar microrganismo, tema ou palavra-chave" /></div><Filters values={["Todos", "Bactérias", "Fungos", "Vírus"]} active={category} onChange={(value) => setCategory(value as typeof category)} /><div className="mt-5 grid gap-4 lg:grid-cols-2">{filtered.map((organism) => <article key={organism.id} className="glass-panel rounded-[24px] p-5"><div className="flex items-start justify-between gap-3"><h2 className="font-display text-xl font-bold italic">{organism.name}</h2><span className="rounded-full bg-primary/20 px-2.5 py-1 text-[11px] font-semibold text-primary">{organism.category}</span></div><p className="mt-1 text-xs text-muted-foreground">{organism.source}</p><div className="mt-5 space-y-4"><Info label="Quem é?" text={organism.who} /><Info label="Onde está?" text={organism.where} /><Info label="Como funciona?" text={organism.how} /><Info label="Patogenicidade" text={organism.pathogenicity} /><Info label="Importância odontológica" text={organism.importance} /></div></article>)}</div>{filtered.length === 0 && <Empty {...academicEmptyCopy.conteudos} />}</Page>;
}

function Questions({ state, updateState }: { state: SavedState; updateState: (value: Partial<SavedState>) => void }) {
  const [filter, setFilter] = useState("Todas"); const [index, setIndex] = useState(0); const [selected, setSelected] = useState<number | null>(null);
  const list = questions.filter((q) => filter === "Todas" || q.category === filter); const question = list[index % list.length];
  if (!question) return <Empty {...academicEmptyCopy.questoes} />;
  const answer = (answerIndex: number) => { if (selected !== null) return; setSelected(answerIndex); const isCorrect = answerIndex === question.correct; updateState({ answered: state.answered + 1, correct: state.correct + (isCorrect ? 1 : 0), wrongIds: isCorrect ? state.wrongIds.filter((id) => id !== question.id) : Array.from(new Set([...state.wrongIds, question.id])) }); };
  return <Page title="Banco de Questões" subtitle="Responda uma questão por vez e receba feedback imediato"><Filters values={["Todas", "Bactérias", "Fungos", "Vírus", "Importância Odontológica"]} active={filter} onChange={(value) => { setFilter(value); setIndex(0); setSelected(null); }} /><section className="glass-panel mx-auto mt-6 max-w-3xl rounded-[28px] p-5 sm:p-7"><p className="text-xs font-semibold uppercase text-muted-foreground">Questão {index + 1} de {list.length}</p><h2 className="mt-3 font-display text-xl font-bold leading-snug sm:text-2xl">{question.prompt}</h2><div className="mt-6 space-y-3">{question.options.map((option, optionIndex) => { const correct = selected !== null && optionIndex === question.correct; const wrong = selected === optionIndex && optionIndex !== question.correct; return <button key={option} onClick={() => answer(optionIndex)} className={cn("flex min-h-14 w-full items-center gap-3 rounded-xl border border-glass-border bg-glass px-4 text-left text-sm transition-colors hover:bg-glass-strong", correct && "border-primary bg-primary/20", wrong && "border-destructive bg-destructive/20")}><span className="grid size-7 shrink-0 place-items-center rounded-full bg-glass-strong font-semibold">{String.fromCharCode(65 + optionIndex)}</span>{option}{correct && <Check className="ml-auto size-5 text-primary" />}{wrong && <X className="ml-auto size-5 text-destructive" />}</button>; })}</div>{selected !== null && <div className={cn("mt-5 rounded-2xl border p-4", selected === question.correct ? "border-primary/40 bg-primary/15" : "border-destructive/40 bg-destructive/15")}><p className="flex items-center gap-2 font-semibold">{selected === question.correct ? <><Check className="size-5 text-primary" />Resposta correta</> : <><CircleAlert className="size-5 text-destructive" />Resposta incorreta</>}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{question.explanation}</p><Button className="mt-4" onClick={() => { setIndex((current) => (current + 1) % list.length); setSelected(null); }}>Próxima<ArrowRight className="size-4" /></Button></div>}</section></Page>;
}

function Simulations({ state, updateState, onNavigate }: { state: SavedState; updateState: (value: Partial<SavedState>) => void; onNavigate: (view: ViewId) => void }) {
  const [count, setCount] = useState(10); const [running, setRunning] = useState(false); const [index, setIndex] = useState(0); const [answers, setAnswers] = useState<Record<string, number>>({}); const [finished, setFinished] = useState(false); const [startedAt, setStartedAt] = useState(0);
  const available = questions.slice(0, Math.min(count, questions.length));
  const finish = () => { const correct = available.filter((q) => answers[q.id] === q.correct).length; const seconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000)); const entry = { id: crypto.randomUUID(), date: new Date().toLocaleDateString("pt-BR"), count: available.length, correct, seconds }; updateState({ history: [entry, ...state.history].slice(0, 50), answered: state.answered + available.length, correct: state.correct + correct, wrongIds: Array.from(new Set([...state.wrongIds, ...available.filter((q) => answers[q.id] !== q.correct).map((q) => q.id)])) }); setFinished(true); };
  if (!running) return <Page title="Simulados" subtitle={`Aluno: ${state.name}`}><div className="glass-panel max-w-xl rounded-[28px] p-5"><h2 className="font-display text-xl font-bold">Quantas questões?</h2><div className="mt-5 grid grid-cols-3 gap-3">{[10,20,30].map((value) => <button key={value} onClick={() => setCount(value)} className={cn("min-h-20 rounded-xl border border-glass-border bg-glass font-display text-xl font-bold", count === value && "border-primary bg-primary/20 text-primary")}>{value}</button>)}</div><p className="mt-4 text-sm text-muted-foreground">Há {questions.length} questões disponíveis no material inicial. O simulado usará até esse total.</p><Button className="mt-5 w-full" size="lg" onClick={() => { setRunning(true); setStartedAt(Date.now()); }}>Iniciar simulado</Button></div></Page>;
  const correct = available.filter((q) => answers[q.id] === q.correct).length;
  if (finished) return <Page title="Resultado" subtitle={state.name}><div className="glass-panel mx-auto max-w-xl rounded-[28px] p-6 text-center"><Trophy className="mx-auto size-10 text-accent" /><p className="mt-4 text-sm text-muted-foreground">Nota</p><p className="font-display text-5xl font-extrabold">{correct.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} <span className="text-xl text-muted-foreground">/ {available.length}</span></p><p className="mt-2 text-muted-foreground">Aproveitamento: {Math.round((correct / available.length) * 100)}%</p><div className="mt-6 grid grid-cols-2 gap-3"><Metric value={correct} label="Acertos" /><Metric value={available.length - correct} label="Erros" /></div><div className="mt-5 flex flex-col gap-2"><Button onClick={() => onNavigate("revisao")}>Revisar erros</Button><Button variant="secondary" onClick={() => { setRunning(false); setFinished(false); setAnswers({}); setIndex(0); }}>Novo simulado</Button><Button variant="quiet" onClick={() => onNavigate("ranking")}>Ver ranking</Button></div></div></Page>;
  const question = available[index]; if (!question) return <Empty {...academicEmptyCopy.simulados} />;
  return <Page title="Simulado em andamento" subtitle={`Questão ${index + 1} de ${available.length}`}><div className="mb-5 h-2 overflow-hidden rounded-full bg-glass"><div className="h-full bg-primary transition-all" style={{ width: `${((index + 1) / available.length) * 100}%` }} /></div><section className="glass-panel mx-auto max-w-3xl rounded-[28px] p-5"><h2 className="font-display text-xl font-bold">{question.prompt}</h2><div className="mt-5 space-y-3">{question.options.map((option, optionIndex) => <button key={option} onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))} className={cn("min-h-14 w-full rounded-xl border border-glass-border bg-glass px-4 text-left text-sm", answers[question.id] === optionIndex && "border-primary bg-primary/20")}>{option}</button>)}</div><div className="mt-6 flex justify-between"><Button variant="secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}><ArrowLeft className="size-4" />Voltar</Button>{index === available.length - 1 ? <Button disabled={Object.keys(answers).length < available.length} onClick={finish}>Finalizar</Button> : <Button disabled={answers[question.id] === undefined} onClick={() => setIndex(index + 1)}>Próxima<ArrowRight className="size-4" /></Button>}</div></section></Page>;
}

function HistoryView({ history }: { history: HistoryEntry[] }) { return <Page title="Meu Histórico" subtitle="Seus simulados realizados">{history.length ? <div className="grid gap-3 md:grid-cols-2">{history.map((entry) => <article key={entry.id} className="glass-panel rounded-2xl p-5"><div className="flex justify-between"><strong className="font-display">Microbiologia e Imunologia</strong><span className="text-xs text-muted-foreground">{entry.date}</span></div><div className="mt-5 grid grid-cols-4 gap-2"><Metric value={entry.count} label="Questões" /><Metric value={entry.correct} label="Acertos" /><Metric value={`${Math.round((entry.correct / entry.count) * 100)}%`} label="Nota" /><Metric value={`${entry.seconds}s`} label="Tempo" /></div></article>)}</div> : <Empty title="Seu histórico está vazio" description="Complete um simulado para registrar seu primeiro resultado." />}</Page>; }

function Ranking({ state }: { state: SavedState }) { const ranked = state.history.map((entry) => ({ ...entry, score: Math.round((entry.correct / entry.count) * 100) })).sort((a,b) => b.score - a.score || a.seconds - b.seconds); return <Page title="🏆 Ranking" subtitle="Maior percentual de acertos; em empate, menor tempo"><div className="space-y-3">{ranked.length ? ranked.map((entry, index) => <article key={entry.id} className="glass-panel flex items-center gap-4 rounded-2xl p-4"><span className="grid size-10 place-items-center rounded-full bg-primary/20 font-display font-bold text-primary">{index + 1}</span><div className="min-w-0 flex-1"><strong className="block truncate">{state.name}</strong><span className="text-xs text-muted-foreground">{entry.count} questões · {entry.correct} acertos</span></div><div className="text-right"><strong className="font-display text-lg">{entry.score}%</strong><span className="block text-xs text-muted-foreground">{entry.seconds}s</span></div></article>) : <Empty title="Ranking ainda vazio" description="Seus melhores simulados aparecerão aqui." />}</div></Page>; }

function Flashcards({ state, updateState }: { state: SavedState; updateState: (value: Partial<SavedState>) => void }) { const [index, setIndex] = useState(0); const [flipped, setFlipped] = useState(false); const card = flashcards[index]; const record = (right: boolean) => { updateState(right ? { flashcardRight: state.flashcardRight + 1 } : { flashcardWrong: state.flashcardWrong + 1 }); setIndex((index + 1) % flashcards.length); setFlipped(false); }; return <Page title="Flashcards" subtitle={`${index + 1} de ${flashcards.length}`}><button onClick={() => setFlipped(!flipped)} className="glass-panel mx-auto flex min-h-80 w-full max-w-2xl flex-col items-center justify-center rounded-[28px] p-8 text-center"><span className="text-xs font-semibold uppercase text-muted-foreground">{flipped ? "Verso" : "Frente"}</span><p className="mt-5 font-display text-2xl font-bold leading-relaxed">{flipped ? card.back : card.front}</p><span className="mt-6 text-xs text-muted-foreground">{flipped ? card.source : "Toque para revelar"}</span></button><div className="mx-auto mt-4 grid max-w-2xl grid-cols-2 gap-3"><Button variant="danger" disabled={!flipped} onClick={() => record(false)}><X className="size-4" />Errei</Button><Button disabled={!flipped} onClick={() => record(true)}><Check className="size-4" />Acertei</Button></div></Page>; }

function Review({ state, updateState }: { state: SavedState; updateState: (value: Partial<SavedState>) => void }) { const reviewQuestions = questions.filter((q) => state.wrongIds.includes(q.id)); if (!reviewQuestions.length) return <Page title="Revisão" subtitle="Reforce os pontos que precisam de atenção"><Empty {...academicEmptyCopy.revisao} /></Page>; return <Page title="Revisão" subtitle={`${reviewQuestions.length} questões para refazer`}><div className="glass-panel rounded-2xl p-5"><p className="text-sm text-muted-foreground">As questões erradas estão prontas para uma nova tentativa.</p><Button className="mt-4" onClick={() => updateState({ wrongIds: [] })}>Marcar revisão como concluída</Button></div></Page>; }

function ProgressView({ state }: { state: SavedState }) { const accuracy = state.answered ? Math.round((state.correct / state.answered) * 100) : 0; const best = state.history.length ? Math.max(...state.history.map((item) => Math.round((item.correct / item.count) * 100))) : 0; const average = state.history.length ? Math.round(state.history.reduce((sum,item) => sum + (item.correct / item.count) * 100, 0) / state.history.length) : 0; const metrics = [[organisms.length,"Conteúdos disponíveis"],[state.answered,"Questões respondidas"],[`${accuracy}%`,"Percentual de acerto"],[state.history.length,"Simulados realizados"],[`${average}%`,"Média"],[`${best}%`,"Maior nota"]]; return <Page title="Meu Progresso" subtitle="Acompanhe sua evolução acadêmica"><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{metrics.map(([value,label]) => <div key={label} className="glass-panel rounded-2xl p-5"><strong className="font-display text-3xl">{value}</strong><span className="mt-2 block text-xs text-muted-foreground">{label}</span></div>)}</div><div className="glass-panel mt-5 rounded-[28px] p-5"><h2 className="font-display text-lg font-bold">Visão geral</h2><div className="mt-6 flex h-36 items-end gap-3">{[accuracy, average, best].map((value, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div className="flex h-28 w-full items-end overflow-hidden rounded-lg bg-glass"><div className="w-full bg-primary transition-all" style={{ height: `${Math.max(4,value)}%` }} /></div><span className="text-xs text-muted-foreground">{["Acerto","Média","Maior"][index]}</span></div>)}</div></div></Page>; }

function Profile({ state, updateState }: { state: SavedState; updateState: (value: Partial<SavedState>) => void }) { const [name, setName] = useState(state.name); return <Page title="Perfil" subtitle="Seus dados ficam salvos somente neste navegador"><div className="glass-panel max-w-xl rounded-[28px] p-5"><label htmlFor="profile-name" className="text-sm font-semibold">Nome do aluno</label><input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={60} className="mt-2 h-12 w-full rounded-xl border border-input bg-glass px-4 outline-none focus:ring-2 focus:ring-ring" placeholder="Digite seu nome" /><Button className="mt-4" disabled={!name.trim()} onClick={() => updateState({ name: name.trim() })}>Salvar nome</Button></div></Page>; }

function NameDialog({ onClose, onSave }: { onClose: () => void; onSave: (name: string) => void }) { const [name, setName] = useState(""); return <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-lg" role="dialog" aria-modal="true" aria-labelledby="name-title"><div className="glass-panel w-full max-w-md rounded-[28px] p-6"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase text-primary">Antes de começar</p><h2 id="name-title" className="mt-2 font-display text-2xl font-bold">Qual é o seu nome?</h2></div><Button size="icon" variant="quiet" onClick={onClose} aria-label="Fechar"><X className="size-5" /></Button></div><label htmlFor="student-name" className="mt-6 block text-sm font-medium">Nome do aluno</label><input id="student-name" autoFocus value={name} onChange={(event) => setName(event.target.value)} maxLength={60} onKeyDown={(event) => { if (event.key === "Enter" && name.trim()) onSave(name.trim()); }} className="mt-2 h-12 w-full rounded-xl border border-input bg-glass px-4 outline-none focus:ring-2 focus:ring-ring" placeholder="Como podemos chamar você?" /><Button className="mt-4 w-full" size="lg" disabled={!name.trim()} onClick={() => onSave(name.trim())}>Continuar</Button></div></div>; }

function BottomNav({ view, onNavigate }: { view: ViewId; onNavigate: (view: ViewId) => void }) { return <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-2xl border border-glass-border bg-background/85 p-1.5 shadow-2xl backdrop-blur-2xl md:hidden" aria-label="Navegação principal">{navItems.map((item) => <button key={item.id} onClick={() => onNavigate(item.id)} className={cn("flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium text-muted-foreground", view === item.id && "bg-primary text-primary-foreground")}><item.icon className="size-4" /><span>{item.label}</span></button>)}</nav>; }
function Page({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) { return <div><header className="mb-7"><h1 className="font-display text-3xl font-extrabold sm:text-4xl">{title}</h1><p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p></header>{children}</div>; }
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) { return <div className="mb-4"><h2 className="font-display text-xl font-bold">{title}</h2>{subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}</div>; }
function Metric({ value, label }: { value: string | number; label: string }) { return <div className="rounded-xl bg-glass p-3"><strong className="block font-display text-lg">{value}</strong><span className="block truncate text-[10px] text-muted-foreground">{label}</span></div>; }
function Info({ label, text }: { label: string; text: string }) { return <div><h3 className="text-[11px] font-bold uppercase text-primary">{label}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div>; }
function Filters({ values, active, onChange }: { values: string[]; active: string; onChange: (value: string) => void }) { return <div className="flex gap-2 overflow-x-auto pb-1">{values.map((value) => <button key={value} onClick={() => onChange(value)} className={cn("min-h-10 shrink-0 rounded-full border border-glass-border bg-glass px-4 text-xs font-semibold text-muted-foreground", active === value && "border-primary bg-primary text-primary-foreground")}>{value}</button>)}</div>; }
function Empty({ title, description }: { title: string; description: string }) { return <div className="glass-panel mx-auto max-w-xl rounded-[28px] p-8 text-center"><FileText className="mx-auto size-10 text-primary" /><h2 className="mt-4 font-display text-xl font-bold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></div>; }
function firstName(name: string) { return name.trim().split(/\s+/)[0] || name; }
function initials(name: string) { return name.trim().split(/\s+/).slice(0,2).map((part) => part[0]?.toUpperCase()).join("") || "?"; }