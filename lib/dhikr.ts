import type { Dhikr, LocalizedText } from "./types";

/** Urutan & kunci kategori (label diterjemahkan via messages.categories). */
export const CATEGORIES = ["daily", "ramadan", "rizq", "quran"] as const;

/** Pilih teks sesuai locale (fallback ke English). */
export function pick(text: LocalizedText, locale: string): string {
  return locale === "id" ? text.id : text.en;
}

/**
 * Daftar dzikir & doa preset.
 * Teks Arab & latin universal; arti/keutamaan/sumber per-locale.
 */
export const DHIKR_PRESETS: Dhikr[] = [
  // ───────────── Tasbih & Dzikir Harian ─────────────
  {
    id: "subhanallah",
    arabic: "سُبْحَانَ اللَّهِ",
    latin: "Subhānallāh",
    translation: { en: "Glory be to Allah", id: "Maha Suci Allah" },
    defaultTarget: 33,
    category: "daily",
    virtue: {
      en: "Recited 33× after the obligatory prayer.",
      id: "Dibaca 33x setelah shalat fardhu.",
    },
  },
  {
    id: "alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    latin: "Alhamdulillāh",
    translation: {
      en: "All praise is due to Allah",
      id: "Segala puji bagi Allah",
    },
    defaultTarget: 33,
    category: "daily",
    virtue: {
      en: "Recited 33× after the obligatory prayer.",
      id: "Dibaca 33x setelah shalat fardhu.",
    },
  },
  {
    id: "allahu-akbar",
    arabic: "اللَّهُ أَكْبَرُ",
    latin: "Allāhu Akbar",
    translation: { en: "Allah is the Greatest", id: "Allah Maha Besar" },
    defaultTarget: 33,
    category: "daily",
    virtue: {
      en: "Recited 33× (or 34×) to complete the tasbih after prayer.",
      id: "Dibaca 33x (atau 34x) menyempurnakan tasbih setelah shalat.",
    },
  },
  {
    id: "tahlil",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    latin: "Lā ilāha illallāh",
    translation: {
      en: "There is no god but Allah",
      id: "Tiada Tuhan selain Allah",
    },
    defaultTarget: 100,
    category: "daily",
    virtue: { en: "The most virtuous dhikr.", id: "Dzikir paling utama." },
  },
  {
    id: "istighfar",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    latin: "Astaghfirullāh",
    translation: {
      en: "I seek forgiveness from Allah",
      id: "Aku memohon ampun kepada Allah",
    },
    defaultTarget: 100,
    category: "daily",
    virtue: {
      en: "Seeking forgiveness; eases provision and affairs.",
      id: "Memohon ampunan, melapangkan rezeki dan urusan.",
    },
  },
  {
    id: "subhanallah-wabihamdihi",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    latin: "Subhānallāhi wa biḥamdih",
    translation: {
      en: "Glory and praise be to Allah",
      id: "Maha Suci Allah dan segala puji bagi-Nya",
    },
    defaultTarget: 100,
    category: "daily",
    virtue: {
      en: "Light on the tongue, heavy on the scale, beloved to Allah.",
      id: "Ringan di lisan, berat di timbangan, dicintai Allah.",
    },
  },
  {
    id: "subhanallahil-azhim",
    arabic: "سُبْحَانَ اللَّهِ الْعَظِيمِ",
    latin: "Subhānallāhil 'aẓīm",
    translation: {
      en: "Glory be to Allah, the Most Great",
      id: "Maha Suci Allah Yang Maha Agung",
    },
    defaultTarget: 33,
    category: "daily",
    virtue: {
      en: "With 'wa biḥamdih', two phrases beloved to Allah.",
      id: "Bersama 'wa biḥamdih' menjadi dua kalimat yang dicintai Allah.",
    },
  },
  {
    id: "hawqalah",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    latin: "Lā ḥawla wa lā quwwata illā billāh",
    translation: {
      en: "There is no power nor strength except with Allah",
      id: "Tiada daya dan upaya kecuali dengan pertolongan Allah",
    },
    defaultTarget: 100,
    category: "daily",
    virtue: {
      en: "One of the treasures of Paradise.",
      id: "Salah satu simpanan (perbendaharaan) surga.",
    },
  },
  {
    id: "hasbunallah",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    latin: "Ḥasbunallāhu wa ni'mal wakīl",
    translation: {
      en: "Allah is sufficient for us, and He is the best Disposer of affairs",
      id: "Cukuplah Allah bagi kami, dan Dia sebaik-baik Pelindung",
    },
    defaultTarget: 100,
    category: "daily",
    virtue: {
      en: "Said when facing hardship and trials.",
      id: "Diucapkan saat menghadapi kesulitan dan ujian.",
    },
  },
  {
    id: "shalawat",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ",
    latin: "Allāhumma ṣalli 'alā Muḥammad",
    translation: {
      en: "O Allah, send blessings upon Prophet Muhammad",
      id: "Ya Allah, limpahkanlah shalawat kepada Nabi Muhammad",
    },
    defaultTarget: 100,
    category: "daily",
    virtue: {
      en: "One blessing is returned tenfold by Allah.",
      id: "Satu shalawat dibalas sepuluh kali oleh Allah.",
    },
  },

  // ───────────── Ramadan ─────────────
  {
    id: "afuww-lailatulqadar",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    latin: "Allāhumma innaka 'afuwwun tuḥibbul 'afwa fa'fu 'annī",
    translation: {
      en: "O Allah, You are Most Forgiving and love forgiveness, so forgive me",
      id: "Ya Allah, sesungguhnya Engkau Maha Pemaaf dan menyukai maaf, maka maafkanlah aku",
    },
    defaultTarget: 100,
    category: "ramadan",
    source: { en: "Narrated by Tirmidhi", id: "HR. Tirmidzi" },
    virtue: {
      en: "Taught by the Prophet ﷺ to recite often on Laylatul Qadr.",
      id: "Doa yang diajarkan Nabi ﷺ untuk diperbanyak pada Lailatul Qadar.",
    },
  },

  // ───────────── Rezeki ─────────────
  {
    id: "rizq-ikfini",
    arabic:
      "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    latin:
      "Allāhummakfinī biḥalālika 'an ḥarāmika wa aghninī bifaḍlika 'amman siwāka",
    translation: {
      en: "O Allah, suffice me with what is lawful instead of the unlawful, and enrich me by Your grace so I need none besides You",
      id: "Ya Allah, cukupkanlah aku dengan rezeki halal-Mu sehingga terhindar dari yang haram, dan kayakanlah aku dengan karunia-Mu sehingga tak butuh kepada selain-Mu",
    },
    defaultTarget: 33,
    category: "rizq",
    source: { en: "Narrated by Tirmidhi", id: "HR. Tirmidzi" },
    virtue: {
      en: "A du'a for sufficiency of lawful provision and blessing.",
      id: "Doa memohon kecukupan rezeki yang halal dan keberkahan.",
    },
  },
  {
    id: "rizq-ilmu-amal",
    arabic:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
    latin:
      "Allāhumma innī as'aluka 'ilman nāfi'an wa rizqan ṭayyiban wa 'amalan mutaqabbalan",
    translation: {
      en: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds",
      id: "Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima",
    },
    defaultTarget: 7,
    category: "rizq",
    source: { en: "Narrated by Ibn Majah", id: "HR. Ibnu Majah" },
    virtue: {
      en: "A du'a the Prophet ﷺ recited after Fajr.",
      id: "Doa yang dibaca Nabi ﷺ setelah shalat Subuh.",
    },
  },

  // ───────────── Doa dari Al-Qur'an ─────────────
  {
    id: "doa-musa-qasas",
    arabic: "رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    latin: "Rabbi innī limā anzalta ilayya min khairin faqīr",
    translation: {
      en: "My Lord, indeed I am, for whatever good You send down to me, in need",
      id: "Ya Tuhanku, sesungguhnya aku sangat membutuhkan kebaikan apa pun yang Engkau turunkan kepadaku",
    },
    defaultTarget: 7,
    category: "quran",
    source: { en: "Quran — Al-Qaṣaṣ: 24", id: "QS. Al-Qaṣaṣ: 24" },
    virtue: {
      en: "Prophet Musa's ﷺ du'a while resting in Madyan.",
      id: "Doa Nabi Musa ﷺ saat beristirahat di Madyan.",
    },
  },
  {
    id: "rabbana-atina",
    arabic:
      "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin:
      "Rabbanā ātinā fid-dunyā ḥasanah, wa fil-ākhirati ḥasanah, wa qinā 'ażāban-nār",
    translation: {
      en: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire",
      id: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka",
    },
    defaultTarget: 7,
    category: "quran",
    source: { en: "Quran — Al-Baqarah: 201", id: "QS. Al-Baqarah: 201" },
    virtue: {
      en: "The du'a the Prophet ﷺ recited most often.",
      id: "Doa yang paling sering dipanjatkan Nabi ﷺ.",
    },
  },
  {
    id: "rabbi-zidni-ilma",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    latin: "Rabbi zidnī 'ilmā",
    translation: {
      en: "My Lord, increase me in knowledge",
      id: "Ya Tuhanku, tambahkanlah ilmu kepadaku",
    },
    defaultTarget: 7,
    category: "quran",
    source: { en: "Quran — Ṭāhā: 114", id: "QS. Ṭāhā: 114" },
    virtue: {
      en: "Asking for an increase in beneficial knowledge.",
      id: "Memohon tambahan ilmu yang bermanfaat.",
    },
  },
];

const BY_ID = new Map(DHIKR_PRESETS.map((d) => [d.id, d]));

export function getDhikr(id: string): Dhikr | undefined {
  return BY_ID.get(id);
}

/** Dzikir dikelompokkan per kunci kategori, dalam urutan CATEGORIES. */
export const DHIKR_BY_CATEGORY: { category: string; items: Dhikr[] }[] =
  CATEGORIES.map((category) => ({
    category,
    items: DHIKR_PRESETS.filter((d) => d.category === category),
  })).filter((g) => g.items.length > 0);
