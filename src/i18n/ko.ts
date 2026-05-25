/**
 * ko.ts — Korean translation. Must satisfy `Translation` (the shape of en.ts).
 * Proper nouns, agency acronyms, chemical names, source-document titles, and
 * units are left untranslated. Lookup KEYS are unchanged — only values translate.
 */
import type { Translation } from "./en";

export const ko: Translation = {
  langName: "한국어",
  ui: {
    language: "언어",
    whatThisMeans: "이것의 의미",
    sectionNav: "섹션 탐색",
    skipToContent: "본문으로 건너뛰기",
    reset: "재설정",
    show: "펼치기",
    hide: "접기",
    resetToObserved: (rate: string) => `관측값으로 재설정 (${rate}°F/시간)`,
    sourcePrefix: "출처:",
    notWithin: (h: number) => `${h}시간 내 도달 안 함`,
    alreadyAtAbove: "이미 도달/초과",
    approxHours: (h: number) => `~${h}시간`,
  },

  breaking: {
    label: "속보",
  },

  banner: {
    subtitle: "투명한 추정치이며, 공식 안내가 아닙니다.",
    importantLabel: "중요:",
    disclaimer:
      "이 사이트는 OCFA, GKN Aerospace, 가든그로브시, EPA, Cal OES와 무관합니다. 특정 주소가 안전한지 판단하지 않습니다.",
    followOfficial: "공식 대피 및 복귀 지침을 따르십시오.",
    officialHeading: "공식 출처를 확인하세요",
    channelRoles: {
      "Orange County Fire Authority (OCFA)": "사고 지휘, 대피 및 복귀",
      "City of Garden Grove": "지역 비상 알림",
      "California Governor's Office of Emergency Services (Cal OES)": "주 비상 대응 조정",
      "U.S. Environmental Protection Agency (EPA)": "대기 모니터링 및 환경 대응",
      "Orange County Health Care Agency": "공중보건 안내",
    },
    lastUpdate: "데이터 마지막 업데이트:",
    reportedNote: "보고된 수치만 표시 — 아래 출처 및 가정 참조.",
    liveTempLabel: "실시간 추정 탱크 온도",
    liveTempSub: "실시간 추정치 (~1°F/시간) — 측정값 아님; 게이지는 최대 100°F까지만 표시",
  },

  nav: {
    summary: "요약",
    timeline: "타임라인",
    temperature: "온도",
    composition: "구성",
    pressure: "압력",
    plume: "확산",
    unknowns: "미지수",
    faq: "질문",
    glossary: "용어",
    sources: "출처",
    evacuation: "대피",
  },

  sections: {
    summary: {
      eyebrow: "상황 요약",
      title: "현재 상황",
      intro: (p) =>
        `${p.city}의 ${p.facility}에서 보고된 상황의 스냅샷으로, 그에 합당한 불확실성과 함께 제시합니다. 보고된 내용: 약 ${p.lo}–${p.hi} 갤런의 ${p.chemical} (CAS ${p.cas})가 ${p.cap} 갤런 탱크에 있습니다.`,
    },
    timeline: {
      eyebrow: "보고된 연대기",
      title: "보고된 데이터 타임라인",
      intro:
        "보고된 각 온도 측정과 사건이 발생한 시점을 최신순으로 표시합니다. 공개 출처가 보고한 시간이며 독립적으로 검증되지 않았습니다.",
    },
    temperature: {
      eyebrow: "시나리오 모델",
      title: "온도 시나리오",
      intro:
        "가정을 조정하고 세 가지 투명한 가정 곡선을 공개된 기준 임계값과 비교하세요. 어느 것도 예측이 아닙니다.",
    },
    composition: {
      eyebrow: "에너지 추정기",
      title: "내부 구성 / 에너지 추정",
      intro:
        "측정된 온도 상승이 나타낼 수 있는 중합 정도를 에너지 등가로 추정한 것이며, 탱크 내부의 실제 내용물을 측정한 것이 아닙니다.",
    },
    pressure: {
      eyebrow: "맥락",
      title: "압력 및 증기 맥락",
      intro:
        "평형 증기압은 온도에 따라 상승하지만, 탱크 내부의 전체 압력과는 다릅니다.",
    },
    plume: {
      eyebrow: "교육",
      title: "증기 플룸의 거동",
      intro:
        "개념 설명이며 — 의도적으로 실시간 위험 지도가 아닙니다 — 플룸 경로가 불확실한 이유를 다룹니다.",
    },
    unknowns: {
      eyebrow: "정직성",
      title: "알려진 미지수",
      intro:
        "실제 평가에 필요하지만 공개되지 않은 변수들입니다.",
    },
    faq: {
      eyebrow: "질문",
      title: "자주 묻는 질문",
      intro:
        "흔한 질문에 대한 쉬운 답변입니다. 어느 것도 특정 장소가 안전한지 알려주지 않습니다 — 오직 당국만이 알 수 있습니다.",
    },
    glossary: {
      eyebrow: "쉬운 말",
      title: "용어집",
      intro: "이 페이지에서 사용된 주요 용어의 짧은 정의입니다.",
    },
    sources: {
      eyebrow: "투명성",
      title: "출처 및 가정",
      intro:
        "모든 사실, 상수, 임계값은 여기에 나열된 공개 출처로 거슬러 올라갑니다.",
    },
    evacuation: {
      eyebrow: "대피",
      title: "대피 구역 지도",
      intro:
        "보고된 대피 구역의 스냅샷입니다. 경계와 명령은 바뀝니다 — 현재 대피 구역과 지침은 항상 OCFA 및 지역 당국에 확인하세요.",
    },
  },

  summary: {
    reportedTemp: "보고된 내부 온도",
    estimatedTemp: "현재 추정 온도",
    estimatedSub: "실시간 추정치 (~1°F/시간)",
    atAbove: (label: string) => `도달/초과: ${label}`,
    belowThresholds: "표시된 임계값 미만",
    reportedTrend: "보고된 추세",
    reportedRateSub: "보고된 상승률 (~1°F/시간)",
    fromTwoReadings: "최근 두 보고 측정값 기준",
    needTwo: "측정값 2개 이상 필요",
    estVolume: "추정 MMA 부피",
    gallonsReported: "갤런 (보고된 범위)",
    knownUnknowns: "알려진 미지수",
    criticalVars: "공개되지 않은 핵심 변수",
    modelConfidence: "모델 신뢰도",
    low: "낮음",
    medium: "보통",
    confMedium: "보고 측정값 2개 이상",
    confLow: "입력 제한적",
    plainHeading: "쉽게 말하면",
    plainBody:
      "탱크에는 액체 MMA와 그 위의 증기 공간이 있을 가능성이 높습니다. 우려는 단순한 열만이 아닙니다. MMA는 PMMA/아크릴로 중합되며 열을 방출할 수 있습니다. 그 반응이 냉각을 앞지르거나 통기를 막으면 압력과 파열 위험이 커질 수 있습니다.",
    wtmPre:
      "이 카드들은 보고된 수치와, 공개된 저장 지침에 비춘 위치를 요약합니다. ‘모델 신뢰도’는 입력이 얼마나 완전한지를 반영하며 — 가장 중요한 변수들(",
    wtmLink: "알려진 미지수",
    wtmPost:
      "에 나열됨)이 공개되지 않았기 때문에 ‘보통’으로 제한됩니다. 이 중 어느 것도 특정 장소가 안전한지 알려주지 않으며, 오직 당국만이 알 수 있습니다.",
  },

  timeline: {
    kind: {
      incident: "사고",
      reading: "데이터",
      report: "뉴스",
      official: "공식",
    },
    readingTitle: (tempF: number) => `보고된 내부 온도: ${tempF}°F`,
    observationLabels: {
      "Earlier reported internal temperature": "이전에 보고된 내부 온도",
      "Reported internal gauge temperature": "보고된 내부 게이지 온도",
      "Internal temperature 100°F+ (the gauge maxes out at 100°F)": "내부 온도 100°F+ (게이지는 최대 100°F까지만 표시)",
    },
    observationSources: {
      "Reuters/AP public reporting": "Reuters/AP 공개 보도",
      "OCFA Critical Incident Update (Chief Covey), via NBC LA": "OCFA 중대사고 업데이트(Covey 국장), NBC LA 경유",
      "ABC7 (KABC), citing OCFA": "ABC7 (KABC), OCFA 인용",
    },
    confidence: {
      reported: "보고됨",
      estimated: "추정",
      official: "공식",
      unconfirmed: "미확인",
    },
    events: {
      "incident-start": {
        title: "사고 발생 보고",
        detail:
          "가든그로브의 GKN Aerospace 시설에서 메틸메타크릴레이트(MMA)를 담은 34,000갤런 저장 탱크에 대한 우려가 보고되었습니다.",
      },
      "reuters-report": {
        title: "Reuters, 온도 상승과 냉각 노력 보도",
        detail:
          "소방관들이 외부에서 물로 탱크를 냉각; 전문가들이 안정화/중화를 모색; 손상되거나 굳은 밸브가 화학물질 제거와 압력 해소를 제한한다고 보고됨.",
      },
      "state-emergency": {
        title: "캘리포니아 주지사, 비상사태 선포",
        detail: "사고에 대응해 주 차원의 비상사태가 선포됨.",
      },
      "ap-report": {
        title: "Associated Press, 위기 보도",
        detail:
          "대응 조치와 대피 맥락 보도; 당시 대기 모니터링에서는 부지 외부 오염이 감지되지 않았다고 전해졌으나 주민들은 대피 명령을 따르라는 안내를 받음.",
      },
      "crack-confirmed": {
        title: "OCFA, 탱크 균열 확인",
        detail:
          "OCFA가 탱크의 균열을 확인했습니다. 압력이 해소되었는지 확인하기 위해 일요일 밤새 정찰 작전이 예정되었습니다.",
        bannerTitle: "OCFA 탱크 균열 확인",
      },
    },
    wtmPre:
      "이는 공개 보도와 공식 발표에서 가져온 보고된 시간이며 — 독립적으로 검증되지 않았고, 특정 측정 시각이 주어지지 않은 경우 시간은 대략적입니다. 새 측정값을 ",
    wtmPost:
      " 에 추가하면 여기에 자동으로 표시됩니다. 현재 상황은 항상 공식 채널에 의존하세요.",
  },

  temperature: {
    assumptions: "가정",
    startTemp: "시작 온도",
    startTempHelp: "가장 최근에 보고된 내부 온도.",
    prevTemp: "이전에 알려진 온도",
    prevTempHelp: "상승률 추정에 사용되는 이전 보고 측정값.",
    hoursBetween: "측정 간 시간(시간)",
    observedRate: "관측된 상승률",
    observedRateHelp:
      "두 측정값에서 자동 계산되지만 직접 변경할 수 있습니다.",
    cooling: "냉각 효과",
    coolingHelp:
      "능동 냉각이 시간이 지나며 상승률을 얼마나 억제하는지. 0% = 억제 없음.",
    acceleration: "가속 계수",
    accelerationHelp:
      "예시용 폭주형 곡선에만 영향. 높을수록 자기 가열이 빨라짐.",
    horizon: "시뮬레이션 기간",
    hoursFromNow: "지금부터 경과 시간",
    nowEstimated: "현재 (추정)",
    extrapolatedNote:
      "시작점은 마지막으로 보고된 90°F에서 ~1°F/시간으로 외삽한 실시간 추정치로, 매시간 약 1°F씩 올라갑니다. 게이지는 최대 100°F까지만 표시하므로 현재 온도는 직접 측정된 것이 아닙니다.",
    illustrativeNote: (ceiling: number) =>
      `빨간 점선 곡선은 예시용 폭주형 시나리오이며 예측이 아닙니다. ${ceiling}°F에서 상한 처리되며 차트 위로 벗어날 수 있습니다.`,
    legend: {
      linear: "선형(일정 상승률)",
      cooling: "냉각 제어",
      accelerating: "예시용 폭주형",
    },
    timeToThreshold: "각 임계값 도달 시간",
    timeToThresholdNote: "— 시나리오 계산일 뿐, 예측된 고장 시각이 아님",
    thColThreshold: "임계값",
    wtmPre:
      "이 세 곡선은 산술 계산이며 예보가 아닙니다. 선형 곡선은 관측된 상승률을 단순히 연장합니다. 냉각 제어 곡선은 능동 냉각이 상승을 점차 늦춘다고 가정합니다. 예시용 폭주형 곡선은 중합이 냉각을 앞지를 경우 자기 가속 열이 어떻게 보일 수 있는지를 보여주며 — 교육용 형태일 뿐 예측이 아닙니다. 실제 탱크 거동은 ",
    wtmLink: "알려진 미지수",
    wtmPost:
      "에 달려 있습니다. ‘임계값 도달 시간’ 값은 각 선이 기준 온도를 지나는 지점일 뿐, 예측된 고장 시각이 결코 아닙니다.",
  },

  thresholds: {
    86: { label: "선호 저장 목표", detail: "약 30°C / 86°F 미만이 가능한 경우 선호되는 저장 목표입니다." },
    95: { label: "BASF 저장 안정성", detail: "BASF SDS는 35°C / 95°F 미만의 저장 안정성을 명시합니다." },
    104: { label: "억제제 보호 상한", detail: "메타크릴레이트 에스터 취급 지침: 안정제 손실을 막기 위해 40°C / 104°F 미만으로 유지." },
    113: { label: "재안정화 임계값", detail: "BASF SDS: 대용량 탱크가 45°C / 113°F에 이르면 재안정화 시스템을 사용해야 합니다." },
    140: { label: "중대 비상 임계값", detail: "BASF SDS: 화재 인접 상황에서 60°C / 140°F에 이르면 더 넓은 구역의 대피가 권장됩니다." },
  },

  composition: {
    assumptions: "가정",
    volMin: "부피 — 최소",
    volLikely: "부피 — 가능성",
    volMax: "부피 — 최대",
    density: "밀도",
    heatCapacity: "비열",
    initialTemp: "초기 온도",
    currentTemp: "현재 온도",
    coolingMult: "냉각 제거 배수",
    coolingMultHelp:
      "1× = 완전 단열(열 제거 없음). 값이 높을수록 온도 상승으로 나타나기 전에 냉각이 열을 빼냈다고 가정합니다.",
    convFromTemp: "에너지 등가 전환율 (온도 상승만 기준)",
    withCoolingMult: (n: number) => `냉각 배수 적용 (${n}×)`,
    inconsistentTitle: "이 가정들은 서로 모순됩니다.",
    inconsistentBody:
      "냉각 보정 추정치가 100%를 초과하는데, 이는 물리적으로 불가능합니다. 보통 냉각 배수가 데이터가 뒷받침하는 것보다 높게 설정되었음을 의미합니다. 실제 결과가 아니라 ‘가정이 맞지 않음’으로 받아들이세요.",
    conceptualTitle: "개념적 구성 (에너지 등가, 측정값 아님)",
    segRemaining: "남은 액체 MMA",
    segRemainingNote: "아직 액체 상태인 미반응 단량체.",
    segPolymerized: "중합/겔화 (에너지 등가)",
    segPolymerizedNote:
      "측정된 온도 상승만으로 추정되는 에너지 등가 비율.",
    segUnknown: "미지 / 측정되지 않은 기울기",
    segUnknownNote:
      "능동 냉각이 가렸을 수 있는 추가 반응. 냉각 배수에 따라 증가합니다.",
    segVapor: "증기 / 상부 공간",
    segVaporNote: "부피로는 크지만 질량으로는 매우 작음 — 개념적으로 표시.",
    absByVolume: "부피별 절대 에너지",
    absByVolumeNote:
      "— 위의 전환율 %는 모든 부피에서 동일하며, 줄(Joule) 수치만 비례합니다",
    colVolume: "부피",
    colMass: "질량",
    colIfFully: "완전 중합 시",
    colHeatFromRise: "측정된 상승에서의 열",
    rowMinimum: "최소",
    rowLikely: "가능성",
    rowMaximum: "최대",
    badgeHeatOfPoly: (v: number) => `중합열: ${v} kJ/mol`,
    badgeEnergyEquiv: "에너지 등가 추정치 — 측정값 아님",
    wtm:
      "관측된 77°F → 90°F 상승만으로는, 열이 전혀 제거되지 않았다면 MMA→PMMA 전체 중합 에너지의 한 자릿수 낮은 퍼센트에 불과합니다. 소방관들이 탱크를 냉각하고 있고 내부 온도가 균일하지 않을 수 있으므로 실제 전환율은 더 높거나 낮을 수 있습니다. 이는 에너지 등가 추정치이며 실제 구성의 측정값이 아닙니다. 냉각수가 상당한 열을 제거했거나, 내부 온도가 균일하지 않거나, 통기가 있거나, 물질이 겔화되었거나, 압력이 해소된 경우 크게 틀릴 수 있습니다.",
  },

  pressure: {
    tempAxis: "온도 (°F)",
    vpCaptionPre: "NOAA CHRIS 기준 액체의 평형 증기압 — 탱크 전체 압력이 아님.",
    vpCaptionAt90: (psi: number) => `약 90°F에서 이는 약 ${psi} psi입니다.`,
    vpTooltip: "평형 증기압",
    forceTitle: "압력 → 힘 (교육용 전용)",
    forceIntro: "작은 압력도 넓은 면적에 작용하면 여전히 큰 총 힘을 만듭니다:",
    pressureLabel: "압력",
    areaLabel: "표면적",
    resultingForce: "결과 힘",
    tonsApprox: (tons: string) => `≈ ${tons} US톤의 힘`,
    forceDisclaimer:
      "이는 압력이 면적에 따라 어떻게 커지는지에 대한 교과서적 예시입니다. 이 탱크의 강도나 파손 지점에 대한 진술이 아닙니다.",
    wtm:
      "평형 증기압은 온도에 따라 상승하지만, 실제 탱크 압력은 통기, 상부 공간, 기체 발생, 배관을 막는 중합체, 누출이나 균열, 구조 상태에 따라 달라지므로 둘을 동일시하지 마세요. 낮은 psi 수치도 큰 탱크 표면 전체에 큰 힘을 만들 수 있습니다. 우리는 의도적으로 탱크의 파손 압력을 추정하지 않습니다: 그것은 탱크 설계, 용접, 부식, 통기 설정, 충전 수위, 변형 데이터 없이는 알 수 없습니다.",
  },

  plume: {
    svgAlt:
      "바람에 의해 풍하 방향으로 넓어지는 증기 플룸과 저지대 고임, 건물 영향을 보여주는 개념 그림. 위험 지도가 아닙니다.",
    labelSource: "발생원",
    labelWind: "바람 방향",
    labelCrosswind: "측풍 확산",
    labelBuilding: "건물 와류",
    labelLowArea: "저지대 고임",
    figCaption: "개념용일 뿐 — 위험 지도가 아니며 이 사고에 특정되지 않음.",
    p1: "플룸은 레이저 빔도 아니고 완벽한 원도 아닙니다.",
    p2: "바람이 대체로 주된 방향을 결정하지만, 경사, 건물, 배수구, 저지대는 공기보다 무거운 증기가 지면 근처에 고이는 위치에 영향을 줄 수 있습니다.",
    p3: "공식 플룸 또는 폭발 지도는 단순화된 모델과 비상 계획 가정에서 나올 수 있습니다. 이는 계획 도구일 뿐, 증기가 정확히 어디에 있을지/없을지를 보장하지 않습니다.",
    limitationsTitle: "플룸 도구의 한계 (예: NOAA ALOHA)",
    limitations: {
      gaussian: { title: "가우시안 가정", detail: "실제 방출이 정확히 따르는 경우가 드문, 매끄럽고 이상화된 종형 확산을 가정합니다." },
      lowWind: { title: "약풍 및 안정 대기", detail: "매우 약한 바람이나 안정한 대기 조건에서는 신뢰도가 낮습니다." },
      patchiness: { title: "발생원 근처 불균일", detail: "발생원 가까이의 농도는 불균일하고 모델링하기 어려울 수 있습니다." },
      windShifts: { title: "풍향 변화", detail: "시간에 따른 풍향 변화를 충분히 반영하지 못합니다." },
      terrain: { title: "지형 유도", detail: "언덕, 경사, 저지대는 모델이 무시하는 방식으로 증기를 유도할 수 있습니다." },
      urban: { title: "도시 건물 와류", detail: "건물은 단순 플룸이 포착하지 못하는 소용돌이와 정체 구역을 만듭니다." },
      reactions: { title: "화학 반응", detail: "이동하면서 구름을 변화시키는 반응을 모델링하지 않습니다." },
      fragments: { title: "위험 파편", detail: "격렬한 파열은 파편을 날릴 수 있으며 — 증기 확산 모델의 일부가 아닙니다." },
    },
    wtm:
      "우리는 의도적으로 정밀한 실시간 위험 지도를 그리지 않습니다 — 그것은 증기 위치에 대한 잘못된 확신을 줄 수 있습니다. 이것은 플룸이 왜 불확실한지를 이해하는 용도로만 사용하세요. 실제로 어디가 안전한지는 공식 실시간 모니터링과 대피 명령에 의존하세요.",
  },

  unknowns: {
    items: {
      "Actual tank pressure": { item: "실제 탱크 압력", why: "증기압은 탱크 압력이 아닙니다; 실제 값은 통기, 기체 발생, 구조에 따라 달라집니다." },
      "Tank design pressure (atmospheric vs. low-pressure rating)": { item: "탱크 설계 압력(대기압 대 저압 등급)", why: "용기가 파손 전에 견딜 수 있는 내부 압력을 결정합니다." },
      "Relief-valve condition": { item: "안전밸브 상태", why: "손상/굳음으로 보고되어 압력 해소를 제한합니다." },
      "Whether vents are blocked by polymer": { item: "통기구가 중합체로 막혔는지 여부", why: "중합체/겔이 통기구를 막아 압력을 가둘 수 있습니다." },
      "Inhibitor (stabilizer) concentration": { item: "억제제(안정제) 농도", why: "억제제는 중합을 억제하며, 고갈되면 반응 위험이 커집니다." },
      "Dissolved / headspace oxygen": { item: "용존 / 상부 공간 산소", why: "산소는 억제제 화학 및 반응성과 상호작용합니다." },
      "Contamination or initiators present": { item: "오염 또는 개시제 존재", why: "과산화물, 녹 또는 기타 개시제가 중합을 시작시킬 수 있습니다." },
      "Actual internal temperature gradients": { item: "실제 내부 온도 기울기", why: "단일 게이지로는 대량 액체 내부의 고온 지점을 알 수 없습니다." },
      "Polymer / gel fraction": { item: "중합체 / 겔 비율", why: "이미 얼마나 반응했는지가 열과 흐름 거동을 바꿉니다." },
      "Cooling water flow rate and heat removal": { item: "냉각수 유량 및 열 제거량", why: "유지되는 열 대비 얼마나 많은 열이 제거되는지를 결정합니다." },
      "Tank wall deformation / bulging": { item: "탱크 벽 변형 / 부풀음", why: "부풀음은 응력을 나타내며 파손 거동을 바꿉니다." },
      "Leak / crack status": { item: "누출 / 균열 상태", why: "기존 누출은 압력, 방출, 화재 위험을 바꿉니다." },
      "Nearby tank contents and status": { item: "인근 탱크 내용물 및 상태", why: "인접 위험요소가 시나리오를 악화시키거나 바꿀 수 있습니다." },
      "Wind and real-time air monitoring": { item: "바람 및 실시간 대기 모니터링", why: "증기가 어디로 가는지와 현재 부지 외부에 무엇이 있는지를 좌우합니다." },
    },
    wtm:
      "위의 모든 항목이 체크되지 않은 것은 정보가 공개되지 않았기 때문입니다. 바로 이 때문에 이 사이트를 포함한 어떤 웹사이트도 특정 장소가 안전한지 알려줄 수 없습니다. 이것들을 측정할 수 있는 사람은 공식 대응 인력이며, 그들의 지침을 따르세요.",
  },

  sources: {
    heading: "출처",
    note:
      "링크는 각 기관의 공식 사이트를 가리킵니다. 특정 문서가 이동했다면 해당 기관에서 제목으로 검색하세요.",
    keyAssumptions: "주요 가정",
    categories: {
      "official-order": "공식",
      news: "뉴스",
      "chemical-reference": "화학 참고자료",
      "safety-data": "안전 데이터",
      scientific: "과학",
    },
    usedFor: {
      "ca-emergency": "사고 상태 및 공식 대응 맥락.",
      ap: "사고 사실, 대응 조치, 대피 맥락.",
      reuters: "보고된 온도, ~1°F/시간 추세, 냉각 목표.",
      "noaa-cameo": "반응성, 중합 위험, 일반 대응 지침.",
      "noaa-chris": "밀도, 비열 교차 확인, 증기압 표.",
      "niosh-pocket": "직업적 노출 한계(교육용 전용).",
      "basf-sds": "저장 안정성, 재안정화, 대피 임계값.",
      "cefic-handling": "억제제 보호를 위한 저장·취급 온도 지침.",
      "nist-webbook": "액체 비열 기본값(~298 K에서 ~191 J/mol·K).",
      "noaa-aloha": "교육 섹션에서 설명한 플룸 모델 한계.",
      "heat-of-poly": "구성 추정기의 에너지 등가 계산.",
    },
    assumptions: {
      molarMass: (v: number) => `MMA 몰질량 = ${v} g/mol`,
      density: (v: number) => `기본 밀도 = ${v} kg/L (조정 가능 0.92–0.96)`,
      heatCapacity: (v: number) => `기본 비열 = ${v} kJ/(kg·K)`,
      heatOfPoly: (v: number) => `중합열 = ${v} kJ/mol`,
      vaporPressure: "증기압 = NOAA CHRIS 평형 표 (탱크 압력 아님)",
      tempCurves: "온도 곡선은 산술 시나리오이며 예보가 아님",
      conversion: "전환율은 에너지 등가이며 측정된 구성이 아님",
    },
  },

  faq: {
    items: [
      {
        q: "이것은 공식 사이트인가요? 우리 집이 안전한지 알려줄 수 있나요?",
        a: "아니요. 이것은 어떤 기관과도 무관한 독립 교육 프로젝트이며, 특정 주소가 안전한지 판단할 수 없습니다. 오직 공식 대응 인력만이 할 수 있습니다. OCFA, 가든그로브시, Cal OES, EPA, 오렌지 카운티 보건국을 따르세요.",
      },
      {
        q: "메틸메타크릴레이트(MMA)란 무엇인가요?",
        a: "PMMA(아크릴) 플라스틱을 만드는 데 쓰이는 무색의 가연성 액체입니다. 상온에서는 대부분 액체이며 그 위에 증기가 있고, 중합되어 — 화학적으로 결합해 고체가 되며 — 열을 방출할 수 있습니다.",
      },
      {
        q: "왜 온도가 그렇게 우려되나요? 그냥 열 아닌가요?",
        a: "우려는 단순한 열만이 아닙니다. MMA가 중합되기 시작하면 반응 자체가 열을 방출합니다. 그 열이 냉각을 앞지르거나 통기를 막으면 압력과 파열 위험이 커질 수 있습니다. 그래서 대응 인력이 탱크를 냉각하고 있습니다.",
      },
      {
        q: "공기에서 매캐하거나 네일살롱 같은 냄새가 나요. 위험한가요?",
        a: "냄새는 안전 측정값이 아닙니다 — 중요한 수준보다 훨씬 낮거나 높은 농도에서도 MMA 냄새를 맡을 수 있어 코는 위험을 가늠하는 신뢰할 만한 기준이 아닙니다. 대신 공식 실시간 대기 모니터링과 보건 지침에 의존하세요.",
      },
      {
        q: "탱크가 폭발하나요?",
        a: "그것은 알 수 없습니다. 중합이 폭주하면 격렬한 파열이 인정된 위험이지만, 그 발생 여부나 시점을 공개적으로 예측할 수 있는 사람은 없습니다 — 필요한 정보가 없습니다(알려진 미지수 참조). 그래도 대피 명령을 따르세요.",
      },
      {
        q: "이 사이트의 데이터는 얼마나 최신인가요?",
        a: "타임스탬프가 있는 보고 수치를 표시하며(타임라인 참조) 실시간 피드가 아니고 독립적으로 검증되지 않았습니다. 현재 상황은 항상 공식 채널을 이용하세요.",
      },
      {
        q: "사이트는 왜 정확한 답을 주지 않나요?",
        a: "가장 중요한 변수들 — 실제 압력, 밸브 상태, 억제제 수준, 내부 고온 지점 등 — 이 공개되지 않았기 때문입니다. 정확한 숫자는 거짓 정밀함이 될 것입니다. 여기 도구들은 메커니즘과 범위를 이해하기 위한 것이지 예측이 아닙니다.",
      },
      {
        q: "공식 경보는 어떻게 받나요?",
        a: "이 페이지 상단에 링크된 공식 출처를 이용하고, 거주 카운티의 비상 경보에 등록하세요. 대피, 대피소, 복귀 결정은 그 당국이 내립니다.",
      },
    ],
  },

  glossary: {
    items: [
      { term: "메틸메타크릴레이트 (MMA)", def: "탱크 속 화학물질(CAS 80-62-6): 아크릴 플라스틱을 만드는 데 쓰이는 무색의 가연성 액체 단량체." },
      { term: "단량체(모노머)", def: "여러 개가 결합해 중합체를 이루는 작은 분자. MMA는 단량체이고 PMMA는 중합체입니다." },
      { term: "중합", def: "단량체 분자를 긴 사슬(중합체)로 연결하는 반응. MMA의 경우 열을 방출합니다(발열)." },
      { term: "PMMA / 아크릴", def: "폴리(메틸메타크릴레이트) — MMA가 중합될 때 형성되는 고체 플라스틱(아크릴, 예: 플렉시글라스)." },
      { term: "발열", def: "열을 방출하는 반응. 폭주성 발열 중합이 이 탱크의 핵심 우려입니다." },
      { term: "억제제(안정제)", def: "저장 중 원치 않는 중합을 억제하는 첨가제. 고갈되거나 한계를 넘으면 반응 위험이 커집니다." },
      { term: "증기압", def: "주어진 온도에서 액체와 평형을 이루는 증기의 압력. 온도에 따라 상승하지만 탱크 내부의 전체 압력과는 다릅니다." },
      { term: "상부 공간(헤드스페이스)", def: "탱크 내부 액체 위의 증기로 채워진 공간." },
      { term: "단열", def: "열이 전혀 제거되지 않는 이상적 경우. 추정기의 ‘열 제거 없음’ 가정은 단열이며, 실제 냉각은 실제 상황을 바꿉니다." },
      { term: "플룸", def: "바람에 실려 가는 증기 구름. 경로는 바람, 지형, 건물의 영향을 받아 직선도 완벽한 원도 아닙니다." },
      { term: "재안정화", def: "안정성을 회복하기 위해 대용량 탱크에 억제제를 다시 넣는 것. 지침은 약 45°C / 113°F에서 이를 표시합니다." },
    ],
  },

  evacuation: {
    ordersActive: "대피 명령 발효 중",
    address: "GKN Aerospace / MMA 누출 — 12122 Western Ave, Garden Grove",
    imageAlt:
      "가든그로브 GKN Aerospace MMA 사고의 보고된 대피 구역 지도로, 대략 Ball Road, Valley View Street, Dale Street, Trask Avenue로 둘러싸인 구역을 표시합니다.",
    caption:
      "보고된 스냅샷 — 공식 안내가 아니며 오래되었을 수 있습니다. 현재 대피 구역과 명령은 공식 출처로 확인하세요.",
    zoneHeading: "보고된 구역 경계",
    boundaries: [
      "Ball Road 남쪽",
      "Valley View St 동쪽",
      "Dale Street 서쪽",
      "Trask Avenue 북쪽",
    ],
    wtm:
      "이것은 누군가 캡처한 스냅샷이며 실시간 또는 공식 지도가 아닙니다 — 실제 구역과 명령은 언제든 바뀔 수 있습니다. 현재 대피 구역과 해야 할 일은 다음에 의존하세요",
  },

  share: {
    title: "책임감 있게 공유하세요",
    body:
      "이 대시보드는 메커니즘과 불확실성을 이해하기 위한 것입니다. 공식 대피, 대피소, 복귀 명령을 무시하는 데 사용하지 마세요. 공유한다면 페이지 상단의 공식 출처와 함께 공유하고 — 이것이 어떤 기관의 안내가 아니라 독립적인 교육용 추정치임을 분명히 하세요.",
    copyLink: "링크 복사",
    copied: "복사됨!",
    share: "공유",
    shareScenario: "이 시나리오 공유",
    revisitAt: "이 페이지를 공유하거나 다시 방문하세요",
    message:
      "GKN Aerospace MMA Tank — Garden Grove — 투명하고 불확실성을 고려한 추정치. 공식 안내가 아님; 공식 명령을 따르세요.",
  },

  footer: {
    line1Brand: "GKN Aerospace MMA Tank — Garden Grove.",
    line1:
      " 독립적이고 오픈소스인 교육 프로젝트입니다. OCFA, GKN Aerospace, 가든그로브시, EPA, Cal OES와 무관합니다. 특정 주소가 안전한지 판단하지 않습니다.",
    line2:
      "모든 수치는 실제 불확실성을 지닌 보고값 또는 가정값입니다. 항상 공식 비상 지침을 따르세요.",
  },
};
