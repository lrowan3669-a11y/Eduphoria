export type SubstanceCategory =
  | 'Psychedelics'
  | 'Cannabis'
  | 'Stimulants'
  | 'Depressants'
  | 'Entactogens'
  | 'Dissociatives'
  | 'Plant Medicines'
  | 'Prescription'
  | 'Alcohol';

export interface Substance {
  id: string;
  name: string;
  aliases: string[];
  category: SubstanceCategory;
  emoji: string;
  tagline: string;
  description: string;
  effects: string[];
  risks: string[];
  duration: string;
  onset: string;
  dosage: { level: string; amount: string; notes: string }[];
  interactions: { substance: string; severity: 'low' | 'moderate' | 'high' | 'extreme'; note: string }[];
  harmReduction: string[];
  legalStatus: { region: string; status: string }[];
  culturalHistory: string;
  isPremium: boolean;
}

export const substances: Substance[] = [
  {
    id: 'psilocybin',
    name: 'Psilocybin (Magic Mushrooms)',
    aliases: ['shrooms', 'magic mushrooms', 'psilocin'],
    category: 'Psychedelics',
    emoji: '🍄',
    tagline: 'Classic psychedelic with deep historical roots',
    description:
      'Psilocybin is a naturally occurring psychedelic compound found in over 200 species of mushrooms. It converts to psilocin in the body, which acts on serotonin receptors to produce altered states of consciousness.',
    effects: [
      'Visual and auditory hallucinations',
      'Profound emotional insights',
      'Altered sense of time',
      'Feelings of unity and interconnection',
      'Enhanced creativity',
      'Ego dissolution at high doses',
      'Synesthesia (senses mixing)',
    ],
    risks: [
      'Psychological distress / bad trips',
      'Worsening of pre-existing mental health conditions',
      'Triggering latent psychosis',
      'Accidental injury from impaired coordination',
      'HPPD (rare persistent visual disturbances)',
    ],
    duration: '4–6 hours',
    onset: '20–60 minutes',
    dosage: [
      { level: 'Microdose', amount: '0.1–0.3g', notes: 'Sub-perceptual, cognitive enhancement' },
      { level: 'Low', amount: '0.5–1g', notes: 'Mild effects, good for beginners' },
      { level: 'Moderate', amount: '1.5–3g', notes: 'Clear psychedelic effects' },
      { level: 'High', amount: '3–5g', notes: 'Intense experience, experienced users only' },
      { level: 'Heroic', amount: '5g+', notes: 'Extreme, not recommended' },
    ],
    interactions: [
      { substance: 'Lithium', severity: 'extreme', note: 'Can cause seizures and death' },
      { substance: 'SSRIs/SNRIs', severity: 'moderate', note: 'May reduce effects significantly' },
      { substance: 'MAOIs', severity: 'high', note: 'Can dangerously intensify and prolong effects' },
      { substance: 'Cannabis', severity: 'moderate', note: 'Can intensify and prolong effects unpredictably' },
    ],
    harmReduction: [
      'Never use alone – have a trusted sober sitter',
      'Set and setting are crucial',
      'Start with a low dose if new',
      'Do not mix with other substances',
      'Ensure you are in a safe physical environment',
      'Have a trip stopper (benzodiazepine) available if needed',
      'Avoid if you have personal or family history of psychosis',
    ],
    legalStatus: [
      { region: 'United Kingdom', status: 'Class A – Illegal' },
      { region: 'United States', status: 'Schedule I – Illegal federally (some cities decriminalized)' },
      { region: 'Netherlands', status: 'Truffles legal, mushrooms illegal' },
      { region: 'Jamaica', status: 'Legal' },
      { region: 'Portugal', status: 'Decriminalized' },
    ],
    culturalHistory:
      'Used ceremonially for thousands of years by indigenous cultures in Mesoamerica. The Aztec called them teonanácatl ("flesh of the gods"). Modern research began in the 1950s when R. Gordon Wasson documented their use and Albert Hofmann (who also synthesized LSD) isolated psilocybin.',
    isPremium: false,
  },
  {
    id: 'mdma',
    name: 'MDMA',
    aliases: ['ecstasy', 'molly', 'mandy', 'XTC'],
    category: 'Entactogens',
    emoji: '💊',
    tagline: 'Empathogen with therapeutic potential',
    description:
      'MDMA (3,4-methylenedioxymethamphetamine) is a synthetic drug that alters mood and perception. It produces feelings of emotional closeness, empathy, and euphoria by flooding the brain with serotonin, dopamine, and norepinephrine.',
    effects: [
      'Intense feelings of emotional closeness',
      'Euphoria and well-being',
      'Increased energy',
      'Enhanced sensory experiences',
      'Empathy and openness',
      'Reduced anxiety and fear',
      'Increased sociability',
    ],
    risks: [
      'Hyperthermia (overheating)',
      'Hyponatremia (over-hydration)',
      'Serotonin syndrome',
      'Cardiovascular stress',
      'Neurotoxicity with heavy use',
      'Post-use depression ("comedown")',
      'Addiction potential with regular use',
    ],
    duration: '3–5 hours',
    onset: '30–60 minutes',
    dosage: [
      { level: 'Low', amount: '60–80mg', notes: 'Mild effects, sensory enhancement' },
      { level: 'Common', amount: '80–120mg', notes: 'Typical recreational dose' },
      { level: 'High', amount: '120–160mg', notes: 'Strong effects, increased risk' },
      { level: 'Very High', amount: '160mg+', notes: 'Not recommended, significant risk' },
    ],
    interactions: [
      { substance: 'MAOIs', severity: 'extreme', note: 'Fatal – serotonin syndrome risk' },
      { substance: 'Tramadol', severity: 'extreme', note: 'Serotonin syndrome risk' },
      { substance: 'SSRIs', severity: 'high', note: 'Serotonin syndrome risk, reduces MDMA effects' },
      { substance: 'Alcohol', severity: 'moderate', note: 'Increases dehydration risk' },
      { substance: 'Stimulants', severity: 'high', note: 'Extreme cardiovascular stress' },
    ],
    harmReduction: [
      'Test your substance with a reagent test kit',
      'Start with a lower dose (75mg)',
      'Drink 500ml of water per hour if dancing',
      'Take regular breaks from dancing to avoid overheating',
      'Do not redose more than once',
      'Leave at least 3 months between uses ("3 month rule")',
      'Never mix with other substances especially MAOIs',
    ],
    legalStatus: [
      { region: 'United Kingdom', status: 'Class A – Illegal' },
      { region: 'United States', status: 'Schedule I (FDA Breakthrough Therapy for PTSD)' },
      { region: 'Australia', status: 'Schedule 9 (approved for PTSD therapy in controlled settings)' },
    ],
    culturalHistory:
      'Synthesized in 1912 by Merck, rediscovered by Alexander Shulgin in the 1970s. Used in psychotherapy before being scheduled. Became a major part of rave culture in the 1980s-90s. Currently in Phase 3 FDA trials for PTSD treatment.',
    isPremium: false,
  },
  {
    id: 'cannabis',
    name: 'Cannabis',
    aliases: ['weed', 'marijuana', 'THC', 'CBD', 'hash', 'pot'],
    category: 'Cannabis',
    emoji: '🌿',
    tagline: 'The world\'s most widely used plant medicine',
    description:
      'Cannabis is a plant containing over 100 cannabinoids including THC (psychoactive) and CBD (non-psychoactive). Effects vary greatly depending on strain, cannabinoid ratio, method of use, dosage, and individual biology.',
    effects: [
      'Relaxation and stress relief',
      'Euphoria and mood elevation',
      'Increased appetite',
      'Altered perception of time',
      'Enhanced creativity',
      'Pain relief',
      'Sedation (indica strains)',
      'Anxiety (high THC doses)',
    ],
    risks: [
      'Anxiety and paranoia (especially high THC)',
      'Dependence with daily use',
      'Short-term memory impairment',
      'Respiratory issues from smoking',
      'Cannabis Hyperemesis Syndrome (heavy daily users)',
      'Worsening of psychosis risk in predisposed individuals',
    ],
    duration: '2–4 hours (smoked), 4–8 hours (edibles)',
    onset: '5–15 minutes (smoked), 30–120 minutes (edibles)',
    dosage: [
      { level: 'Microdose', amount: '1–2.5mg THC', notes: 'Subtle, functional use' },
      { level: 'Low', amount: '2.5–5mg THC', notes: 'Mild effects, beginner dose' },
      { level: 'Moderate', amount: '5–15mg THC', notes: 'Clear effects' },
      { level: 'High', amount: '15–30mg THC', notes: 'Strong effects' },
      { level: 'Edibles Caution', amount: 'Start with 5mg', notes: 'Edibles are delayed – wait 2 hours before redosing' },
    ],
    interactions: [
      { substance: 'Blood thinners', severity: 'moderate', note: 'May increase anticoagulant effects' },
      { substance: 'Alcohol', severity: 'moderate', note: 'Intensifies impairment' },
      { substance: 'Psychedelics', severity: 'moderate', note: 'Can intensify and prolong effects' },
      { substance: 'CNS depressants', severity: 'moderate', note: 'Additive sedation' },
    ],
    harmReduction: [
      'Choose strains with higher CBD to THC ratio if anxiety-prone',
      'Start low and go slow, especially with edibles',
      'Avoid smoking – use vaporizers to reduce respiratory harm',
      'Do not drive or operate machinery',
      'Avoid use if under 25 (brain development)',
      'Be aware of tolerance development with daily use',
    ],
    legalStatus: [
      { region: 'United Kingdom', status: 'Class B – Illegal (CBD legal)' },
      { region: 'United States', status: 'Federal Schedule I, legal in 24+ states' },
      { region: 'Canada', status: 'Legal (recreational and medical)' },
      { region: 'Netherlands', status: 'Tolerated (coffeeshops)' },
      { region: 'Germany', status: 'Legal for adults (2024)' },
    ],
    culturalHistory:
      'One of humanity\'s oldest cultivated plants with a 10,000+ year history. Used medicinally in ancient China, India, and Egypt. Cannabis was a major crop in colonial America. Modern prohibition began in the early 20th century. Currently undergoing global legalisation movement.',
    isPremium: false,
  },
  {
    id: 'lsd',
    name: 'LSD',
    aliases: ['acid', 'lysergic acid', 'tabs', 'blotter'],
    category: 'Psychedelics',
    emoji: '🔮',
    tagline: 'Potent synthetic psychedelic',
    description:
      'LSD (lysergic acid diethylamide) is a powerful synthetic psychedelic first synthesized by Albert Hofmann in 1938. It acts primarily on serotonin receptors and produces profound alterations in thought, perception, and consciousness.',
    effects: [
      'Intense visual hallucinations',
      'Profound alteration of thinking',
      'Time distortion',
      'Ego dissolution',
      'Emotional amplification',
      'Enhanced pattern recognition',
      'Spiritual experiences',
    ],
    risks: [
      'Severe anxiety and panic',
      'Triggering latent psychosis',
      'HPPD (persistent visual effects)',
      'Dangerous behaviour from impaired judgement',
      'Psychological trauma from bad trips',
    ],
    duration: '8–12 hours',
    onset: '30–90 minutes',
    dosage: [
      { level: 'Threshold', amount: '25–50µg', notes: 'Barely perceptible effects' },
      { level: 'Low', amount: '50–75µg', notes: 'Mild psychedelic effects' },
      { level: 'Common', amount: '75–150µg', notes: 'Full psychedelic experience' },
      { level: 'High', amount: '150–300µg', notes: 'Very intense, experienced only' },
    ],
    interactions: [
      { substance: 'Lithium', severity: 'extreme', note: 'Can cause seizures' },
      { substance: 'MAOIs', severity: 'high', note: 'Potentiates and prolongs effects dangerously' },
      { substance: 'Cannabis', severity: 'moderate', note: 'Unpredictably intensifies effects' },
    ],
    harmReduction: [
      'Never use alone',
      'Test with Ehrlich reagent (should turn purple)',
      'Choose a safe, familiar environment',
      'Have a trusted sober sitter',
      'Clear your schedule for the full day',
      'Avoid if history of mental health issues',
    ],
    legalStatus: [
      { region: 'United Kingdom', status: 'Class A – Illegal' },
      { region: 'United States', status: 'Schedule I – Illegal' },
      { region: 'Portugal', status: 'Decriminalized' },
    ],
    culturalHistory:
      'Synthesized in 1938 by Albert Hofmann, who discovered its psychedelic properties accidentally in 1943. Central to 1960s counterculture. Used in CIA MKUltra experiments. Inspired musicians, artists, and Silicon Valley figures. Currently in clinical trials for anxiety, addiction, and depression.',
    isPremium: true,
  },
  {
    id: 'ketamine',
    name: 'Ketamine',
    aliases: ['K', 'ket', 'special K', 'horse tranquilizer'],
    category: 'Dissociatives',
    emoji: '🌀',
    tagline: 'Dissociative anaesthetic with therapeutic applications',
    description:
      'Ketamine is a dissociative anaesthetic used medically since the 1960s. It blocks NMDA receptors producing dissociation, analgesia, and at higher doses, the "K-hole" – a profound dissociative state. FDA-approved as esketamine (Spravato) for treatment-resistant depression.',
    effects: [
      'Dissociation from body',
      'Profound K-hole experience (high doses)',
      'Pain relief',
      'Euphoria',
      'Time distortion',
      'Altered perception of space',
      'Antidepressant effects',
    ],
    risks: [
      'K-hole (extreme dissociation, can be dangerous)',
      'Bladder and kidney damage with heavy use',
      'High addiction potential',
      'Memory impairment',
      'Respiratory depression (high doses or with depressants)',
    ],
    duration: '45–90 minutes (nasal/IM)',
    onset: '5–15 minutes',
    dosage: [
      { level: 'Low', amount: '20–50mg', notes: 'Mild dissociation' },
      { level: 'Common', amount: '50–100mg', notes: 'Clear dissociative effects' },
      { level: 'K-hole', amount: '100mg+', notes: 'Extreme dissociation – high risk' },
    ],
    interactions: [
      { substance: 'Depressants/Alcohol', severity: 'extreme', note: 'Respiratory depression risk' },
      { substance: 'Stimulants', severity: 'high', note: 'Cardiovascular stress' },
    ],
    harmReduction: [
      'Never use alone',
      'Never use near water (lakes, baths, pools)',
      'Sit or lie down before use',
      'Do not mix with alcohol or other depressants',
      'Limit use frequency to protect bladder (max 1x/month)',
      'Stay hydrated but do not overdrink',
    ],
    legalStatus: [
      { region: 'United Kingdom', status: 'Class B – Illegal' },
      { region: 'United States', status: 'Schedule III (medical use only)' },
    ],
    culturalHistory:
      'Developed by Parke-Davis in 1962. Widely used as battlefield anaesthetic in Vietnam War. Became recreational in the 1980s. John Lilly conducted controversial consciousness research with ketamine. Now at forefront of depression treatment as esketamine clinics emerge globally.',
    isPremium: true,
  },
  {
    id: 'ayahuasca',
    name: 'Ayahuasca',
    aliases: ['DMT brew', 'yagé', 'vine of the soul'],
    category: 'Plant Medicines',
    emoji: '🌺',
    tagline: 'Sacred Amazonian plant medicine',
    description:
      'Ayahuasca is a sacred brew from the Amazon basin combining DMT-containing plants (usually Psychotria viridis) with MAOI-containing Banisteriopsis caapi vine. Used for thousands of years by indigenous peoples for healing, divination, and spiritual connection.',
    effects: [
      'Powerful visions and hallucinations',
      'Deep emotional processing',
      'Purging (vomiting/diarrhea) as part of healing',
      'Spiritual experiences',
      'Ego dissolution',
      'Past trauma processing',
      'Profound insights',
    ],
    risks: [
      'Extreme psychological intensity',
      'Dangerous with MAOI interactions',
      'Not suitable for those with heart conditions',
      'Psychological destabilisation',
      'Exploitation in unregulated retreats',
    ],
    duration: '4–8 hours',
    onset: '30–60 minutes',
    dosage: [
      { level: 'Ceremonial', amount: 'Variable by curandero', notes: 'Never self-administer without guidance' },
    ],
    interactions: [
      { substance: 'SSRIs/SNRIs', severity: 'extreme', note: 'Serotonin syndrome – potentially fatal' },
      { substance: 'Any MAOI', severity: 'extreme', note: 'Additive MAOI – very dangerous' },
      { substance: 'Stimulants', severity: 'high', note: 'Cardiovascular crisis risk' },
      { substance: 'Lithium', severity: 'high', note: 'Risk of seizures' },
    ],
    harmReduction: [
      'Only use in guided ceremonial settings with experienced facilitators',
      'Research your facilitator thoroughly',
      'Complete MAOI dietary restrictions 2 weeks before',
      'Disclose all medications to facilitator',
      'Have a comprehensive medical screen',
      'Integration support is essential after the experience',
    ],
    legalStatus: [
      { region: 'United Kingdom', status: 'DMT is Class A – Illegal' },
      { region: 'United States', status: 'DMT Schedule I, but religious use protected for UDV/Santo Daime' },
      { region: 'Peru', status: 'Legal (cultural heritage)' },
      { region: 'Brazil', status: 'Legal' },
      { region: 'Netherlands', status: 'Legal (in retreat settings)' },
    ],
    culturalHistory:
      'Used for 3,000+ years by Amazonian indigenous peoples. Missionaries first documented it in the 1700s. Research began in earnest in the 1960s. Now the centre of a global retreat industry and clinical research for depression, PTSD, and addiction.',
    isPremium: true,
  },
  {
    id: 'alcohol',
    name: 'Alcohol',
    aliases: ['booze', 'ethanol', 'drink', 'spirits', 'beer', 'wine'],
    category: 'Alcohol',
    emoji: '🍺',
    tagline: 'Most widely used legal depressant',
    description:
      'Ethanol is a central nervous system depressant and the most widely consumed psychoactive substance globally. Despite being legal, alcohol is responsible for more harm than many illegal drugs by multiple measures.',
    effects: [
      'Relaxation and reduced inhibitions',
      'Euphoria at low doses',
      'Impaired coordination and judgement',
      'Slurred speech',
      'Memory impairment',
      'Sedation',
      'Emotional lability',
    ],
    risks: [
      'Liver disease and cirrhosis',
      'Addiction (Alcohol Use Disorder)',
      'Cancer (mouth, throat, liver, breast)',
      'Cardiovascular disease',
      'Mental health disorders',
      'Dangerous withdrawal (potentially fatal)',
      'Fatal overdose (alcohol poisoning)',
      'Accidents and injuries',
    ],
    duration: '1–8 hours depending on amount',
    onset: '15–30 minutes',
    dosage: [
      { level: 'Low Risk', amount: '1–2 standard drinks', notes: 'Mild relaxation' },
      { level: 'Moderate Risk', amount: '3–5 standard drinks', notes: 'Noticeable impairment' },
      { level: 'High Risk', amount: '6+ drinks', notes: 'Significant impairment and health risks' },
      { level: 'Dangerous', amount: 'BAC 0.3%+', notes: 'Risk of unconsciousness or death' },
    ],
    interactions: [
      { substance: 'Benzodiazepines', severity: 'extreme', note: 'Fatal respiratory depression' },
      { substance: 'Opioids', severity: 'extreme', note: 'Fatal respiratory depression' },
      { substance: 'Ketamine', severity: 'extreme', note: 'Dangerous respiratory and CNS depression' },
      { substance: 'Paracetamol/Acetaminophen', severity: 'high', note: 'Severe liver damage' },
      { substance: 'Stimulants', severity: 'moderate', note: 'Masks intoxication level – risk of alcohol poisoning' },
    ],
    harmReduction: [
      'Never drink on an empty stomach',
      'Alternate alcoholic drinks with water',
      'Set a drink limit before going out',
      'Never drink and drive',
      'Do not mix with other depressants',
      'Know the signs of alcohol poisoning',
      'Recovery position for unconscious individuals',
      'Seek medical help if someone is unconscious',
    ],
    legalStatus: [
      { region: 'Most countries', status: 'Legal for adults 18-21+' },
      { region: 'Muslim-majority countries', status: 'Often restricted or prohibited' },
    ],
    culturalHistory:
      'Fermented beverages date back 10,000+ years. Central to religious ceremonies, social bonding, and medicine throughout history. Prohibition in the US (1920-1933) failed dramatically. WHO rates alcohol as one of the most harmful substances globally, yet it remains legal and socially accepted.',
    isPremium: false,
  },
  {
    id: 'cocaine',
    name: 'Cocaine',
    aliases: ['coke', 'blow', 'charlie', 'snow', 'powder'],
    category: 'Stimulants',
    emoji: '⚡',
    tagline: 'Powerful stimulant with high addiction potential',
    description:
      'Cocaine is a powerful stimulant derived from coca leaves. It blocks the reuptake of dopamine, serotonin, and norepinephrine creating intense but short-lived euphoria. One of the most addictive substances known.',
    effects: [
      'Intense euphoria',
      'Increased energy and alertness',
      'Reduced appetite',
      'Confidence and sociability',
      'Numbing (topical anaesthetic)',
      'Increased heart rate and blood pressure',
    ],
    risks: [
      'Extremely high addiction potential',
      'Heart attack and stroke',
      'Nasal septum damage (snorting)',
      'Lung damage (smoking crack)',
      'Mental health deterioration',
      'Financial ruin',
      'Severe crash and depression after use',
    ],
    duration: '15–30 minutes',
    onset: '1–5 minutes',
    dosage: [
      { level: 'Note', amount: 'Any dose carries risk', notes: 'No truly safe dose due to cardiovascular risks' },
    ],
    interactions: [
      { substance: 'Alcohol', severity: 'high', note: 'Creates cocaethylene in liver – more toxic than either alone' },
      { substance: 'MAOIs', severity: 'extreme', note: 'Hypertensive crisis risk' },
      { substance: 'Heart medications', severity: 'extreme', note: 'Dangerous cardiac effects' },
    ],
    harmReduction: [
      'Test with reagent kits – fentanyl contamination is deadly',
      'Never use alone',
      'Avoid if any heart conditions',
      'Use own clean equipment to avoid blood-borne viruses',
      'Snorting: use own straw, alternate nostrils, rinse nose after',
      'Seek help early if noticing compulsive use patterns',
    ],
    legalStatus: [
      { region: 'United Kingdom', status: 'Class A – Illegal' },
      { region: 'United States', status: 'Schedule II (medical use only)' },
    ],
    culturalHistory:
      'Used by Andean cultures for 3,000+ years. Extracted by Merck in 1860. Freud famously advocated for it. Once in Coca-Cola. Criminalized in early 20th century. Major driver of organised crime and political instability in producing countries.',
    isPremium: true,
  },
];

export const categories: { name: SubstanceCategory; emoji: string; color: string }[] = [
  { name: 'Psychedelics', emoji: '🔮', color: '#9B59B6' },
  { name: 'Cannabis', emoji: '🌿', color: '#39FF14' },
  { name: 'Stimulants', emoji: '⚡', color: '#FFE600' },
  { name: 'Depressants', emoji: '🌙', color: '#4A90D9' },
  { name: 'Entactogens', emoji: '💊', color: '#FF6B9D' },
  { name: 'Dissociatives', emoji: '🌀', color: '#00E5CC' },
  { name: 'Plant Medicines', emoji: '🌺', color: '#FF7F50' },
  { name: 'Prescription', emoji: '💉', color: '#95A5A6' },
  { name: 'Alcohol', emoji: '🍺', color: '#E67E22' },
];
