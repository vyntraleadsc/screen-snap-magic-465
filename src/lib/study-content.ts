export type OrganismCategory = "Bactérias" | "Fungos" | "Vírus";

export type Organism = {
  id: string;
  name: string;
  category: OrganismCategory;
  source: string;
  who: string;
  where: string;
  how: string;
  pathogenicity: string;
  importance: string;
};

export const organisms: Organism[] = [
  {
    id: "s-salivarius",
    name: "Streptococcus salivarius",
    category: "Bactérias",
    source: "Aula Bactérias Oral · páginas 4–7",
    who: "Coco Gram-positivo, anaeróbio facultativo, do grupo salivarius e fermentador de carboidratos.",
    where: "Predomina na língua, saliva e tecidos moles. É colonizador precoce da cavidade oral.",
    how: "Adere a superfícies epiteliais, produz metabólitos que influenciam a comunidade e compete ecologicamente com microrganismos.",
    pathogenicity: "Baixa patogenicidade oral. O dano é incomum e depende de acesso a sítios normalmente estéreis ou desequilíbrio do hospedeiro.",
    importance: "Em condições usuais representa homeostase e colonização; sua presença isolada não indica doença.",
  },
  {
    id: "s-mitis",
    name: "Streptococcus mitis",
    category: "Bactérias",
    source: "Aula Bactérias Oral · páginas 8–11",
    who: "Coco Gram-positivo em pares ou cadeias, anaeróbio facultativo, do grupo mitis.",
    where: "Mucosa, saliva e superfície dental. É colonizador inicial da película adquirida.",
    how: "Adesinas de superfície e coagregação ajudam a construir o biofilme precoce; algumas linhagens produzem H₂O₂.",
    pathogenicity: "Predominantemente comensal; torna-se relevante quando há ruptura de barreira e disseminação para sítios estéreis.",
    importance: "Componente frequente da microbiota oral e participante da construção do biofilme precoce.",
  },
  {
    id: "s-mutans",
    name: "Streptococcus mutans",
    category: "Bactérias",
    source: "Aula Bactérias Oral · páginas 28–32",
    who: "Coco Gram-positivo, anaeróbio facultativo, acidogênico e acidúrico.",
    where: "Superfície dental e biofilme cariogênico, favorecido por açúcares fermentáveis e microambientes de baixo pH.",
    how: "Glicosiltransferases formam glucanos e matriz; a fermentação gera ácidos e a tolerância ao estresse ácido favorece persistência.",
    pathogenicity: "Episódios repetidos de pH baixo deslocam o equilíbrio para desmineralização do esmalte e da dentina.",
    importance: "Fortemente associado à cariogenicidade, mas a cárie é polimicrobiana, ecológica e dependente de biofilme e açúcar.",
  },
  {
    id: "f-nucleatum",
    name: "Fusobacterium nucleatum",
    category: "Bactérias",
    source: "Aula Bactérias Oral · páginas 37–41",
    who: "Bacilo fusiforme Gram-negativo e anaeróbio, componente de biofilmes supra e subgengivais.",
    where: "Biofilme em maturação, com redução de oxigênio e maior densidade celular; é colonizador intermediário clássico.",
    how: "Adesinas participam da coadesão, das interações entre espécies e da integração espacial do biofilme.",
    pathogenicity: "LPS e sinais pró-inflamatórios podem ampliar a inflamação; o dano periodontal é sobretudo indireto.",
    importance: "Atua como ponte ecológica na maturação do biofilme, mas não é marcador isolado de periodontite.",
  },
  {
    id: "s-sobrinus",
    name: "Streptococcus sobrinus",
    category: "Bactérias",
    source: "Microrganismos de Importância Odontológica · páginas 3–6",
    who: "Coco Gram-positivo, anaeróbio facultativo, do grupo mutans, acidogênico e acidúrico.",
    where: "Biofilme dental, sobretudo em ambiente cariogênico e com exposição frequente à sacarose.",
    how: "A sacarose favorece EPS e retenção celular; a fermentação produz ácidos e a aciduricidade mantém atividade em pH baixo.",
    pathogenicity: "Açúcar frequente, matriz rica em glucanos e acidificação repetida selecionam microbiota acidúrica e favorecem desmineralização.",
    importance: "Contribui para a cárie dentro de uma comunidade disbiótica, mesmo sem ser necessariamente dominante na placa.",
  },
  {
    id: "lactobacillus",
    name: "Lactobacillus spp.",
    category: "Bactérias",
    source: "Microrganismos de Importância Odontológica · páginas 7–10",
    who: "Bacilos Gram-positivos, facultativos ou microaerófilos conforme a espécie, fortemente acidogênicos e acidúricos.",
    where: "Saliva, placa e nichos cariogênicos, com enriquecimento em lesões estabelecidas ou profundas.",
    how: "Tolera ambiente acidificado, usa carboidratos, mantém produção de ácido e persiste em nichos retentivos.",
    pathogenicity: "Em lesão estabelecida, mantém a acidificação e amplia a perda mineral e a progressão dentinária.",
    importance: "Relaciona-se mais à progressão da lesão do que ao início da colonização dental.",
  },
  {
    id: "c-albicans",
    name: "Candida albicans",
    category: "Fungos",
    source: "Microrganismos de Importância Odontológica · páginas 23–26",
    who: "Levedura e fungo dimórfico/polimórfico, com formas de levedura, pseudohifa e hifa.",
    where: "Mucosa oral, língua, próteses e saliva; a colonização pode ocorrer sem doença.",
    how: "Adesão leva ao biofilme; a mudança para hifa favorece invasão superficial e a candidalisina contribui para dano epitelial.",
    pathogenicity: "Alterações do hospedeiro ou do nicho favorecem supercrescimento, dano epitelial, inflamação, placas pseudomembranosas ou eritema.",
    importance: "A doença depende da combinação entre virulência fúngica e predisposição do hospedeiro.",
  },
  {
    id: "hsv-1",
    name: "HSV-1",
    category: "Vírus",
    source: "Microrganismos de Importância Odontológica · páginas 39–42",
    who: "Herpesviridae envelopado, com DNA de dupla fita linear, capsídeo icosaédrico e tegumento.",
    where: "Mucosa oral e lábios na infecção produtiva; neurônios sensitivos durante a latência.",
    how: "Após infecção epitelial, alcança neurônios e mantém latência; a reativação leva a nova replicação epitelial.",
    pathogenicity: "A replicação lítica em queratinócitos causa lise e inflamação, formando vesículas que ulceram.",
    importance: "A latência no gânglio trigeminal explica herpes labial e lesões bucais recorrentes.",
  },
];

export type StudyQuestion = {
  id: string;
  category: OrganismCategory | "Importância Odontológica";
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
};

export const questions: StudyQuestion[] = [
  { id: "q1", category: "Bactérias", prompt: "Qual microrganismo é descrito como colonizador precoce predominante em língua e saliva?", options: ["S. mutans", "S. salivarius", "F. nucleatum", "Lactobacillus spp."], correct: 1, explanation: "S. salivarius predomina em língua, saliva e tecidos moles e é colonizador precoce da cavidade oral." },
  { id: "q2", category: "Bactérias", prompt: "O que favorece ecologicamente Streptococcus mutans?", options: ["Ausência de carboidratos", "pH sempre neutro", "Exposição frequente a açúcares e baixo pH", "Renovação celular da mucosa"], correct: 2, explanation: "A exposição frequente a açúcares fermentáveis e episódios repetidos de baixo pH selecionam organismos acidogênicos e acidúricos." },
  { id: "q3", category: "Importância Odontológica", prompt: "Como a aula orienta interpretar S. mutans na cárie?", options: ["Como única causa", "Como contaminante sem importância", "Dentro de uma doença ecológica e polimicrobiana", "Apenas pelo resultado de cultura"], correct: 2, explanation: "O material destaca que a cárie é biofilme-açúcar dependente, ecológica e polimicrobiana." },
  { id: "q4", category: "Bactérias", prompt: "Qual é o papel ecológico central de Fusobacterium nucleatum?", options: ["Colonizador exclusivamente inicial", "Ponte entre colonizadores precoces e tardios", "Destruição direta do esmalte", "Produção de candidalisina"], correct: 1, explanation: "F. nucleatum é um colonizador intermediário clássico que integra comunidades iniciais e anaeróbios tardios." },
  { id: "q5", category: "Bactérias", prompt: "Lactobacillus spp. está mais relacionado a qual etapa da cárie?", options: ["Colonização inicial do esmalte íntegro", "Progressão de lesões estabelecidas", "Formação da película adquirida", "Latência neuronal"], correct: 1, explanation: "O material o relaciona à progressão em nichos cariogênicos estabelecidos e profundos." },
  { id: "q6", category: "Fungos", prompt: "Qual mudança de Candida albicans favorece invasão superficial?", options: ["Perda da parede celular", "Mudança para hifa", "Formação de cápsula", "Latência em neurônios"], correct: 1, explanation: "A transição de levedura para hifa participa da invasão; a candidalisina contribui para dano epitelial." },
  { id: "q7", category: "Fungos", prompt: "A presença de Candida albicans na boca significa necessariamente doença?", options: ["Sim, sempre", "Não, pode haver colonização sem doença", "Somente em próteses", "Somente na língua"], correct: 1, explanation: "A colonização pode ocorrer sem doença; candidose depende também de alterações do nicho e do hospedeiro." },
  { id: "q8", category: "Vírus", prompt: "Onde o HSV-1 permanece principalmente durante a latência?", options: ["Esmalte dental", "Gânglio trigeminal", "Biofilme subgengival", "Prótese dentária"], correct: 1, explanation: "O HSV-1 permanece principalmente no gânglio trigeminal e pode reativar posteriormente." },
  { id: "q9", category: "Vírus", prompt: "O que explica as lesões recorrentes por HSV-1?", options: ["Acidogênese", "Latência seguida de reativação", "Coagregação bacteriana", "Produção de glucanos"], correct: 1, explanation: "A latência neuronal e a reativação com nova replicação epitelial explicam a recorrência." },
  { id: "q10", category: "Importância Odontológica", prompt: "Detectar F. nucleatum isoladamente confirma periodontite?", options: ["Sim", "Não", "Apenas em saliva", "Apenas em crianças"], correct: 1, explanation: "O material afirma que sua presença isolada não deve ser interpretada como diagnóstico de periodontite." },
];

export const flashcards = organisms.map((organism) => ({
  id: `f-${organism.id}`,
  front: `Qual é a importância odontológica de ${organism.name}?`,
  back: organism.importance,
  source: organism.source,
}));