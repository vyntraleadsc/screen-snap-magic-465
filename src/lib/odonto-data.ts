import {
  BookOpen,
  Brain,
  ChartNoAxesColumnIncreasing,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  History,
  House,
  LibraryBig,
  Medal,
  RotateCcw,
  UserRound,
} from "lucide-react";

export const navItems = [
  { id: "inicio", label: "Início", icon: House },
  { id: "disciplinas", label: "Disciplinas", icon: LibraryBig },
  { id: "questoes", label: "Questões", icon: CircleHelp },
  { id: "ranking", label: "Ranking", icon: Medal },
  { id: "perfil", label: "Perfil", icon: UserRound },
] as const;

export type ViewId =
  | (typeof navItems)[number]["id"]
  | "conteudos"
  | "simulados"
  | "historico"
  | "flashcards"
  | "revisao"
  | "progresso";

export const quickLinks = [
  { id: "conteudos", label: "Conteúdos", description: "Leitura organizada", icon: BookOpen },
  { id: "questoes", label: "Questões", description: "Pratique por tema", icon: CircleHelp },
  { id: "simulados", label: "Simulados", description: "Teste seu preparo", icon: ClipboardCheck },
  { id: "ranking", label: "Ranking", description: "Compare resultados", icon: Medal },
  { id: "flashcards", label: "Flashcards", description: "Revise conceitos", icon: Brain },
] satisfies Array<{ id: ViewId; label: string; description: string; icon: typeof BookOpen }>;

export const utilityLinks = [
  { id: "historico", label: "Meu histórico", icon: History },
  { id: "revisao", label: "Revisão", icon: RotateCcw },
  { id: "progresso", label: "Meu progresso", icon: ChartNoAxesColumnIncreasing },
] satisfies Array<{ id: ViewId; label: string; icon: typeof History }>;

export const discipline = {
  title: "Microbiologia e Imunologia",
  status: "Disponível",
  icon: GraduationCap,
};

export const academicEmptyCopy = {
  conteudos: {
    title: "Conteúdos em preparação",
    description: "Os materiais das aulas serão organizados aqui, preservando a terminologia e a estrutura originais.",
  },
  questoes: {
    title: "Banco de questões em preparação",
    description: "As questões e explicações serão criadas exclusivamente a partir dos materiais fornecidos.",
  },
  simulados: {
    title: "Simulados em preparação",
    description: "Quando as questões forem importadas, você poderá montar simulados de 10, 20 ou 30 questões.",
  },
  flashcards: {
    title: "Flashcards em preparação",
    description: "Os cartões serão criados com perguntas e respostas fiéis aos materiais das aulas.",
  },
  revisao: {
    title: "Nenhuma questão para revisar",
    description: "As questões respondidas incorretamente aparecerão aqui para uma nova tentativa.",
  },
};

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}min ${String(remaining).padStart(2, "0")}s`;
};

export { Clock3 };