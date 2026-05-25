/**
 * vi.ts — Vietnamese translation. Must satisfy `Translation` (the shape of en.ts).
 * Proper nouns, agency acronyms, chemical names, source-document titles, and
 * units are left untranslated. Lookup KEYS are unchanged — only values translate.
 */
import type { Translation } from "./en";

export const vi: Translation = {
  langName: "Tiếng Việt",
  ui: {
    language: "Ngôn ngữ",
    whatThisMeans: "Điều này có nghĩa là gì",
    sectionNav: "Điều hướng mục",
    skipToContent: "Bỏ qua đến nội dung",
    reset: "Đặt lại",
    resetToObserved: (rate: string) => `Trở về giá trị quan sát (${rate}°F/giờ)`,
    sourcePrefix: "Nguồn:",
    notWithin: (h: number) => `không trong ${h} giờ`,
    alreadyAtAbove: "đã đạt hoặc vượt",
    approxHours: (h: number) => `~${h} giờ`,
  },

  breaking: {
    label: "Cập nhật khẩn cấp",
  },

  banner: {
    subtitle: "Một ước tính minh bạch, không phải hướng dẫn chính thức.",
    importantLabel: "Quan trọng:",
    disclaimer:
      "Trang này không liên kết với OCFA, GKN Aerospace, Thành phố Garden Grove, EPA hay Cal OES. Trang không xác định bất kỳ địa chỉ nào là an toàn.",
    followOfficial: "Hãy tuân theo các chỉ dẫn chính thức về sơ tán và quay trở lại.",
    officialHeading: "Hãy theo dõi các nguồn chính thức",
    channelRoles: {
      "Orange County Fire Authority (OCFA)": "Chỉ huy sự cố, sơ tán và quay trở lại",
      "City of Garden Grove": "Thông báo khẩn cấp tại địa phương",
      "California Governor's Office of Emergency Services (Cal OES)": "Điều phối khẩn cấp cấp tiểu bang",
      "U.S. Environmental Protection Agency (EPA)": "Giám sát không khí và ứng phó môi trường",
      "Orange County Health Care Agency": "Hướng dẫn y tế công cộng",
    },
    lastUpdate: "Cập nhật dữ liệu lần cuối:",
    reportedNote: "Chỉ là số liệu được báo cáo — xem Nguồn & Giả định bên dưới.",
  },

  nav: {
    summary: "Tóm tắt",
    timeline: "Dòng thời gian",
    temperature: "Nhiệt độ",
    composition: "Thành phần",
    pressure: "Áp suất",
    plume: "Luồng khí",
    unknowns: "Ẩn số",
    faq: "Hỏi đáp",
    glossary: "Thuật ngữ",
    sources: "Nguồn",
  },

  sections: {
    summary: {
      eyebrow: "Tóm tắt tình hình",
      title: "Tình hình hiện tại",
      intro: (p) =>
        `Ảnh chụp nhanh các điều kiện được báo cáo tại ${p.facility} ở ${p.city}, trình bày kèm theo mức độ bất định xứng đáng. Nội dung được báo cáo: khoảng ${p.lo}–${p.hi} gallon ${p.chemical} (CAS ${p.cas}) trong một bồn ${p.cap} gallon.`,
    },
    timeline: {
      eyebrow: "Trình tự được báo cáo",
      title: "Dòng thời gian các dữ liệu được báo cáo",
      intro:
        "Thời điểm xảy ra từng số đo nhiệt độ và sự kiện được báo cáo, mới nhất trước. Đây là thời gian được báo cáo từ các nguồn công khai, chưa được kiểm chứng độc lập.",
    },
    temperature: {
      eyebrow: "Mô hình kịch bản",
      title: "Các kịch bản nhiệt độ",
      intro:
        "Điều chỉnh các giả định và so sánh ba đường cong giả định minh bạch với các ngưỡng tham chiếu đã công bố. Không đường nào là dự đoán.",
    },
    composition: {
      eyebrow: "Bộ ước tính năng lượng",
      title: "Thành phần bên trong / ước tính năng lượng",
      intro:
        "Một ước tính theo năng lượng tương đương về mức polymer hóa mà mức tăng nhiệt độ đo được có thể đại diện — không phải phép đo về những gì thực sự bên trong bồn.",
    },
    pressure: {
      eyebrow: "Bối cảnh",
      title: "Bối cảnh áp suất và hơi",
      intro:
        "Áp suất hơi cân bằng tăng theo nhiệt độ, nhưng nó không giống áp suất tổng bên trong bồn.",
    },
    plume: {
      eyebrow: "Giáo dục",
      title: "Cách các luồng hơi di chuyển",
      intro:
        "Một phần giải thích mang tính khái niệm — cố ý không phải bản đồ nguy hiểm trực tiếp — về lý do đường đi của luồng hơi là bất định.",
    },
    unknowns: {
      eyebrow: "Trung thực",
      title: "Những ẩn số đã biết",
      intro:
        "Những biến số cần thiết cho bất kỳ đánh giá thực sự nào, và hiện không được công khai.",
    },
    faq: {
      eyebrow: "Câu hỏi",
      title: "Câu hỏi thường gặp",
      intro:
        "Giải đáp đơn giản cho các câu hỏi phổ biến. Không câu nào cho bạn biết một địa điểm có an toàn hay không — chỉ cơ quan chức năng mới có thể.",
    },
    glossary: {
      eyebrow: "Ngôn ngữ đơn giản",
      title: "Thuật ngữ",
      intro: "Định nghĩa ngắn gọn các thuật ngữ chính dùng trên trang này.",
    },
    sources: {
      eyebrow: "Minh bạch",
      title: "Nguồn & giả định",
      intro:
        "Mọi dữ kiện, hằng số và ngưỡng đều truy về một nguồn công khai được liệt kê tại đây.",
    },
  },

  summary: {
    reportedTemp: "Nhiệt độ trong được báo cáo",
    atAbove: (label: string) => `Tại/trên: ${label}`,
    belowThresholds: "Dưới các ngưỡng đã liệt kê",
    reportedTrend: "Xu hướng được báo cáo",
    reportedRateSub: "Tốc độ tăng được báo cáo (~1°F/giờ)",
    fromTwoReadings: "Từ hai số đo được báo cáo gần nhất",
    needTwo: "Cần ≥2 số đo",
    estVolume: "Thể tích MMA ước tính",
    gallonsReported: "gallon (khoảng được báo cáo)",
    knownUnknowns: "Ẩn số đã biết",
    criticalVars: "biến số quan trọng chưa được công khai",
    modelConfidence: "Độ tin cậy của mô hình",
    low: "Thấp",
    medium: "Trung bình",
    confMedium: "≥2 số đo được báo cáo",
    confLow: "Dữ liệu hạn chế",
    plainHeading: "Nói một cách đơn giản",
    plainBody:
      "Bồn có thể chứa MMA lỏng cùng khoảng hơi phía trên. Mối lo không chỉ là nhiệt thông thường. MMA có thể polymer hóa thành PMMA/acrylic, tỏa nhiệt. Nếu phản ứng đó vượt quá khả năng làm mát hoặc làm tắc lối thoát hơi, áp suất và nguy cơ nứt vỡ có thể tăng.",
    wtmPre:
      "Các thẻ này tóm tắt số liệu được báo cáo và vị trí của chúng so với hướng dẫn lưu trữ đã công bố. “Độ tin cậy của mô hình” phản ánh mức độ đầy đủ của dữ liệu — được giới hạn ở mức Trung bình vì những biến số quan trọng nhất (liệt kê trong ",
    wtmLink: "Những ẩn số đã biết",
    wtmPost:
      ") không được công khai. Không điều nào trong số này cho bạn biết một địa điểm có an toàn hay không; chỉ các cơ quan chức năng mới có thể.",
  },

  timeline: {
    kind: {
      incident: "Sự cố",
      reading: "Dữ liệu",
      report: "Tin tức",
      official: "Chính thức",
    },
    readingTitle: (tempF: number) => `Nhiệt độ trong được báo cáo: ${tempF}°F`,
    observationLabels: {
      "Earlier reported internal temperature": "Nhiệt độ trong được báo cáo trước đó",
      "Reported internal gauge temperature": "Nhiệt độ đồng hồ trong được báo cáo",
      "Internal temperature 100°F+ (the gauge maxes out at 100°F)": "Nhiệt độ bên trong 100°F+ (đồng hồ chỉ đo tối đa 100°F)",
    },
    observationSources: {
      "Reuters/AP public reporting": "Reuters/AP, báo chí công khai",
      "OCFA Critical Incident Update (Chief Covey), via NBC LA": "Bản cập nhật sự cố nghiêm trọng của OCFA (Chỉ huy Covey), qua NBC LA",
      "ABC7 (KABC), citing OCFA": "ABC7 (KABC), dẫn nguồn OCFA",
    },
    confidence: {
      reported: "được báo cáo",
      estimated: "ước tính",
      official: "chính thức",
      unconfirmed: "chưa xác nhận",
    },
    events: {
      "incident-start": {
        title: "Sự cố được báo cáo bắt đầu",
        detail:
          "Lo ngại được báo cáo tại cơ sở GKN Aerospace ở Garden Grove về một bồn chứa 34.000 gallon chứa methyl methacrylate (MMA).",
      },
      "reuters-report": {
        title: "Reuters đưa tin về việc nhiệt độ tăng và các nỗ lực làm mát",
        detail:
          "Lính cứu hỏa làm mát bồn từ bên ngoài bằng nước; các chuyên gia tìm cách ổn định/trung hòa; van bị hỏng/kẹt được cho là hạn chế việc rút hóa chất và xả áp.",
      },
      "state-emergency": {
        title: "Thống đốc California ban bố Tình trạng Khẩn cấp",
        detail: "Tình trạng khẩn cấp cấp tiểu bang được ban bố để ứng phó sự cố.",
      },
      "ap-report": {
        title: "Associated Press đưa tin về cuộc khủng hoảng",
        detail:
          "Đưa tin về các hành động ứng phó và bối cảnh sơ tán; theo báo cáo, việc giám sát không khí chưa phát hiện ô nhiễm ngoài khu vực vào thời điểm đó, nhưng cư dân được yêu cầu tuân theo lệnh sơ tán.",
      },
    },
    wtmPre:
      "Đây là thời gian được báo cáo, lấy từ báo chí công khai và thông báo chính thức — chưa kiểm chứng độc lập, và giờ trong ngày là ước chừng trừ khi có thời điểm đo cụ thể. Thêm số đo mới trong ",
    wtmPost:
      " và chúng sẽ tự động xuất hiện ở đây. Về tình hình hiện tại, hãy luôn dựa vào các kênh chính thức.",
  },

  temperature: {
    assumptions: "Giả định",
    startTemp: "Nhiệt độ ban đầu",
    startTempHelp: "Nhiệt độ trong được báo cáo gần đây nhất.",
    prevTemp: "Nhiệt độ đã biết trước đó",
    prevTempHelp: "Một số đo được báo cáo trước đó, dùng để ước tính tốc độ.",
    hoursBetween: "Số giờ giữa các lần đo",
    observedRate: "Tốc độ tăng quan sát được",
    observedRateHelp:
      "Tự động tính từ hai số đo, nhưng bạn có thể thay đổi.",
    ambient: "Nhiệt độ môi trường",
    ambientHelp:
      "Nhiệt độ không khí bên ngoài; dùng cho số hạng mất nhiệt do làm mát mang tính minh họa.",
    cooling: "Hiệu quả làm mát",
    coolingHelp:
      "Mức độ làm mát chủ động kìm hãm tốc độ tăng theo thời gian. 0% = không kìm hãm.",
    acceleration: "Hệ số tăng tốc",
    accelerationHelp:
      "CHỈ điều khiển đường cong minh họa kiểu mất kiểm soát. Cao hơn = tự sinh nhiệt nhanh hơn.",
    horizon: "Khoảng mô phỏng",
    hoursFromNow: "Số giờ kể từ bây giờ",
    nowEstimated: "hiện tại (ước tính)",
    extrapolatedNote:
      "Điểm bắt đầu (~123°F) là ước tính ngoại suy từ số đo được báo cáo gần nhất 90°F ở mức ~1°F/giờ. Đồng hồ chỉ đo tối đa 100°F, nên nhiệt độ hiện tại không được đo trực tiếp.",
    illustrativeNote: (ceiling: number) =>
      `Đường đỏ nét đứt là kịch bản minh họa kiểu mất kiểm soát, không phải dự đoán. Nó được giới hạn ở ${ceiling}°F và có thể vượt ra khỏi đỉnh biểu đồ.`,
    legend: {
      linear: "Tuyến tính (tốc độ không đổi)",
      cooling: "Được kiểm soát bằng làm mát",
      accelerating: "Minh họa kiểu mất kiểm soát",
    },
    timeToThreshold: "Thời gian để đạt từng ngưỡng",
    timeToThresholdNote: "— phép tính kịch bản, không phải thời điểm hỏng được dự đoán",
    thColThreshold: "Ngưỡng",
    wtmPre:
      "Ba đường cong này là phép tính số học, không phải dự báo. Đường tuyến tính chỉ kéo dài tốc độ quan sát được. Đường được kiểm soát bằng làm mát giả định việc làm mát chủ động dần làm chậm mức tăng. Đường minh họa kiểu mất kiểm soát cho thấy nhiệt tự tăng tốc có thể trông thế nào nếu polymer hóa vượt quá làm mát — đó là hình minh họa để dạy, không phải dự đoán. Hành vi thực của bồn phụ thuộc vào ",
    wtmLink: "những ẩn số đã biết",
    wtmPost:
      ". Các giá trị “thời gian đạt ngưỡng” chỉ là nơi mỗi đường cắt một nhiệt độ tham chiếu, không bao giờ là thời điểm hỏng được dự đoán.",
  },

  thresholds: {
    86: { label: "Mục tiêu lưu trữ ưu tiên", detail: "Dưới ~30°C / 86°F là mục tiêu lưu trữ ưu tiên khi khả thi." },
    95: { label: "Độ ổn định lưu trữ BASF", detail: "SDS của BASF ghi độ ổn định lưu trữ dưới 35°C / 95°F." },
    104: { label: "Trần bảo vệ chất ức chế", detail: "Hướng dẫn xử lý ester methacrylate: giữ dưới 40°C / 104°F để giúp ngăn mất chất ổn định." },
    113: { label: "Ngưỡng tái ổn định", detail: "SDS của BASF: ở 45°C / 113°F trong bồn lớn, cần dùng hệ thống tái ổn định." },
    140: { label: "Ngưỡng khẩn cấp lớn", detail: "SDS của BASF: ở 60°C / 140°F trong bối cảnh gần đám cháy, khuyến nghị sơ tán khu vực rộng hơn." },
  },

  composition: {
    assumptions: "Giả định",
    volMin: "Thể tích — tối thiểu",
    volLikely: "Thể tích — khả năng",
    volMax: "Thể tích — tối đa",
    density: "Khối lượng riêng",
    heatCapacity: "Nhiệt dung",
    initialTemp: "Nhiệt độ ban đầu",
    currentTemp: "Nhiệt độ hiện tại",
    coolingMult: "Hệ số loại bỏ nhiệt do làm mát",
    coolingMultHelp:
      "1× = hoàn toàn đoạn nhiệt (không loại bỏ nhiệt). Giá trị cao hơn giả định việc làm mát đã mang nhiệt đi trước khi nó thể hiện thành mức tăng nhiệt độ.",
    convFromTemp: "Chuyển đổi theo năng lượng tương đương (chỉ từ mức tăng nhiệt)",
    withCoolingMult: (n: number) => `Với hệ số làm mát (${n}×)`,
    inconsistentTitle: "Các giả định này mâu thuẫn.",
    inconsistentBody:
      "Ước tính đã điều chỉnh theo làm mát vượt quá 100%, điều này là bất khả thi về mặt vật lý. Thường nghĩa là hệ số làm mát đặt cao hơn mức dữ liệu cho phép. Hãy coi đây là “các giả định không khớp”, không phải kết quả thực.",
    conceptualTitle: "Thành phần khái niệm (năng lượng tương đương, không đo được)",
    segRemaining: "MMA lỏng còn lại",
    segRemainingNote: "Monomer chưa phản ứng, vẫn ở dạng lỏng.",
    segPolymerized: "Đã polymer hóa / tạo gel (năng lượng tương đương)",
    segPolymerizedNote:
      "Phần năng lượng tương đương được suy ra chỉ từ mức tăng nhiệt độ đo được.",
    segUnknown: "Chưa biết / gradient chưa đo",
    segUnknownNote:
      "Phản ứng thêm mà việc làm mát chủ động có thể đã che giấu. Tăng theo hệ số làm mát.",
    segVapor: "Hơi / khoảng trống đầu bồn",
    segVaporNote: "Lớn về thể tích, rất nhỏ về khối lượng — hiển thị mang tính khái niệm.",
    absByVolume: "Năng lượng tuyệt đối theo thể tích",
    absByVolumeNote:
      "— % chuyển đổi ở trên là như nhau với mọi thể tích; chỉ số Joule thô thay đổi theo tỷ lệ",
    colVolume: "Thể tích",
    colMass: "Khối lượng",
    colIfFully: "Nếu polymer hóa hoàn toàn",
    colHeatFromRise: "Nhiệt từ mức tăng đo được",
    rowMinimum: "Tối thiểu",
    rowLikely: "Khả năng",
    rowMaximum: "Tối đa",
    badgeHeatOfPoly: (v: number) => `Nhiệt polymer hóa: ${v} kJ/mol`,
    badgeEnergyEquiv: "Ước tính năng lượng tương đương — không phải phép đo",
    wtm:
      "Riêng mức tăng quan sát từ 77°F → 90°F chỉ tương ứng với một phần trăm thấp một chữ số của toàn bộ năng lượng polymer hóa MMA→PMMA nếu không có nhiệt nào bị loại bỏ. Vì lính cứu hỏa đang làm mát bồn, và vì nhiệt độ bên trong có thể không đồng đều, mức chuyển đổi thực có thể cao hơn hoặc thấp hơn. Đây là ước tính theo năng lượng tương đương, không phải phép đo thành phần thực. Nó có thể sai lệch nghiêm trọng nếu nước làm mát đã loại bỏ nhiều nhiệt, nếu nhiệt độ bên trong không đồng đều, nếu có thoát hơi, nếu vật liệu đã tạo gel, hoặc nếu đã xảy ra xả áp.",
  },

  pressure: {
    tempAxis: "Nhiệt độ (°F)",
    vpCaptionPre: "Áp suất hơi cân bằng của chất lỏng theo NOAA CHRIS — không phải áp suất tổng của bồn.",
    vpCaptionAt90: (psi: number) => `Ở ~90°F, giá trị này khoảng ${psi} psi.`,
    vpTooltip: "Áp suất hơi cân bằng",
    forceTitle: "Áp suất → lực (chỉ mang tính giáo dục)",
    forceIntro: "Một áp suất nhỏ tác động lên một diện tích lớn vẫn tạo ra một tổng lực lớn:",
    pressureLabel: "Áp suất",
    areaLabel: "Diện tích bề mặt",
    resultingForce: "Lực tạo ra",
    tonsApprox: (tons: string) => `≈ ${tons} tấn lực (Mỹ)`,
    forceDisclaimer:
      "Đây là minh họa kiểu sách giáo khoa về cách lực tỷ lệ với diện tích. Nó không phải khẳng định về độ bền hay điểm hỏng của bồn này.",
    wtm:
      "Áp suất hơi cân bằng tăng theo nhiệt độ, nhưng áp suất thực của bồn phụ thuộc vào thông hơi, khoảng trống đầu bồn, sự sinh khí, polymer làm tắc đường ống, rò rỉ hoặc nứt, và tình trạng kết cấu — vì vậy đừng đánh đồng hai điều này. Một giá trị psi nhỏ vẫn có thể tạo ra lực lớn trên bề mặt rộng của bồn. Chúng tôi cố ý không ước tính áp suất gây hỏng của bồn: điều đó là chưa biết nếu thiếu dữ liệu về thiết kế bồn, mối hàn, ăn mòn, cài đặt van thông, mức chứa và biến dạng.",
  },

  plume: {
    svgAlt:
      "Minh họa khái niệm về một luồng hơi bị gió cuốn, mở rộng theo chiều gió, kèm hiện tượng tích tụ ở vùng trũng và ảnh hưởng của công trình. Không phải bản đồ nguy hiểm.",
    labelSource: "nguồn",
    labelWind: "hướng gió",
    labelCrosswind: "lan tỏa ngang gió",
    labelBuilding: "xoáy do công trình",
    labelLowArea: "tích tụ vùng trũng",
    figCaption: "Chỉ mang tính khái niệm — không phải bản đồ nguy hiểm và không riêng cho sự cố này.",
    p1: "Một luồng hơi không phải là tia laser và cũng không phải vòng tròn hoàn hảo.",
    p2: "Gió thường quyết định hướng chính, trong khi độ dốc, công trình, cống rãnh và vùng trũng có thể ảnh hưởng đến nơi hơi nặng hơn không khí tích tụ gần mặt đất.",
    p3: "Bản đồ luồng hơi hoặc vụ nổ chính thức có thể đến từ các mô hình đơn giản hóa và giả định lập kế hoạch khẩn cấp. Chúng là công cụ lập kế hoạch, không bảo đảm chính xác nơi hơi sẽ hoặc sẽ không có mặt.",
    limitationsTitle: "Hạn chế của các công cụ luồng hơi (ví dụ NOAA ALOHA)",
    limitations: {
      gaussian: { title: "Giả định Gauss", detail: "Giả định một sự lan tỏa mượt, lý tưởng hình chuông mà các vụ phát thải thực hiếm khi tuân theo chính xác." },
      lowWind: { title: "Gió yếu & không khí ổn định", detail: "Kém tin cậy khi gió rất nhẹ hoặc điều kiện khí quyển ổn định." },
      patchiness: { title: "Không đều gần nguồn", detail: "Nồng độ gần nguồn có thể không đều và khó mô hình hóa." },
      windShifts: { title: "Gió đổi hướng", detail: "Không tính đầy đủ việc hướng gió thay đổi theo thời gian." },
      terrain: { title: "Địa hình dẫn hướng", detail: "Đồi, dốc và vùng trũng có thể dẫn hơi theo cách mà mô hình bỏ qua." },
      urban: { title: "Xoáy đô thị do công trình", detail: "Công trình tạo ra xoáy và vùng tù không được mô hình luồng hơi đơn giản nắm bắt." },
      reactions: { title: "Phản ứng hóa học", detail: "Không mô hình hóa các phản ứng làm thay đổi đám mây khi nó di chuyển." },
      fragments: { title: "Mảnh vỡ nguy hiểm", detail: "Một vụ nứt vỡ dữ dội có thể bắn mảnh vỡ — không nằm trong mô hình phát tán hơi." },
    },
    wtm:
      "Chúng tôi cố ý không vẽ một bản đồ nguy hiểm chính xác, trực tiếp — điều đó sẽ ngụ ý một sự chắc chắn sai lầm về nơi có hơi. Chỉ dùng phần này để hiểu vì sao các luồng hơi là bất định. Để biết nơi thực sự an toàn, hãy dựa vào việc giám sát chính thức theo thời gian thực và các lệnh sơ tán.",
  },

  unknowns: {
    items: {
      "Actual tank pressure": { item: "Áp suất thực của bồn", why: "Áp suất hơi không phải áp suất bồn; giá trị thực phụ thuộc thông hơi, sự sinh khí và kết cấu." },
      "Tank design pressure (atmospheric vs. low-pressure rating)": { item: "Áp suất thiết kế của bồn (khí quyển so với áp suất thấp)", why: "Quyết định bồn chịu được bao nhiêu áp suất bên trong trước khi hỏng." },
      "Relief-valve condition": { item: "Tình trạng van xả áp", why: "Được báo cáo là hỏng/kẹt, làm hạn chế việc xả áp." },
      "Whether vents are blocked by polymer": { item: "Liệu lỗ thông hơi có bị polymer làm tắc", why: "Polymer/gel có thể bịt lỗ thông hơi và giữ lại áp suất." },
      "Inhibitor (stabilizer) concentration": { item: "Nồng độ chất ức chế (chất ổn định)", why: "Chất ức chế kìm hãm polymer hóa; nếu cạn, nguy cơ phản ứng tăng." },
      "Dissolved / headspace oxygen": { item: "Oxy hòa tan / trong khoảng trống đầu bồn", why: "Oxy tương tác với hóa học của chất ức chế và tính phản ứng." },
      "Contamination or initiators present": { item: "Có tạp nhiễm hoặc chất khơi mào", why: "Peroxide, gỉ sét hoặc chất khơi mào khác có thể khởi phát polymer hóa." },
      "Actual internal temperature gradients": { item: "Gradient nhiệt độ bên trong thực tế", why: "Một đồng hồ đơn lẻ không thể cho thấy các điểm nóng bên trong khối lỏng." },
      "Polymer / gel fraction": { item: "Tỷ lệ polymer / gel", why: "Lượng đã phản ứng thay đổi hành vi nhiệt và dòng chảy." },
      "Cooling water flow rate and heat removal": { item: "Lưu lượng nước làm mát và lượng nhiệt loại bỏ", why: "Quyết định bao nhiêu nhiệt được mang đi so với lượng giữ lại." },
      "Tank wall deformation / bulging": { item: "Biến dạng / phồng thành bồn", why: "Phồng cho thấy ứng suất và thay đổi hành vi hỏng." },
      "Leak / crack status": { item: "Tình trạng rò rỉ / nứt", why: "Rò rỉ hiện có làm thay đổi áp suất, sự phát thải và nguy cơ cháy." },
      "Nearby tank contents and status": { item: "Nội dung và tình trạng các bồn lân cận", why: "Mối nguy kế cận có thể cộng hưởng hoặc thay đổi kịch bản." },
      "Wind and real-time air monitoring": { item: "Gió và giám sát không khí theo thời gian thực", why: "Quyết định hơi đi đâu và liệu hiện có gì ngoài khu vực hay không." },
    },
    wtm:
      "Mọi ô ở trên đều chưa được đánh dấu vì thông tin không được công khai. Đây chính là lý do không trang web nào — kể cả trang này — có thể cho bạn biết một địa điểm cụ thể có an toàn hay không. Những người có thể đo các yếu tố này là lực lượng ứng phó chính thức; hãy làm theo chỉ dẫn của họ.",
  },

  sources: {
    heading: "Nguồn",
    note:
      "Các liên kết trỏ tới trang chính thức của mỗi tổ chức. Nếu một tài liệu cụ thể đã chuyển chỗ, hãy tìm theo tiêu đề trong tổ chức đó.",
    keyAssumptions: "Giả định chính",
    categories: {
      "official-order": "Chính thức",
      news: "Tin tức",
      "chemical-reference": "Tham chiếu hóa chất",
      "safety-data": "Dữ liệu an toàn",
      scientific: "Khoa học",
    },
    usedFor: {
      "ca-emergency": "Tình trạng sự cố và bối cảnh ứng phó chính thức.",
      ap: "Dữ kiện sự cố, hành động ứng phó và bối cảnh sơ tán.",
      reuters: "Nhiệt độ được báo cáo, xu hướng ~1°F/giờ và mục tiêu làm mát.",
      "noaa-cameo": "Tính phản ứng, nguy cơ polymer hóa và hướng dẫn ứng phó chung.",
      "noaa-chris": "Khối lượng riêng, đối chiếu nhiệt dung và bảng áp suất hơi.",
      "niosh-pocket": "Giới hạn phơi nhiễm nghề nghiệp (chỉ mang tính giáo dục).",
      "basf-sds": "Độ ổn định lưu trữ, tái ổn định và các ngưỡng sơ tán.",
      "cefic-handling": "Hướng dẫn nhiệt độ lưu trữ và xử lý để bảo vệ chất ức chế.",
      "nist-webbook": "Giá trị mặc định nhiệt dung của chất lỏng (~191 J/mol·K ở ~298 K).",
      "noaa-aloha": "Các hạn chế của mô hình luồng hơi nêu trong mục giáo dục.",
      "heat-of-poly": "Phép tính năng lượng tương đương trong bộ ước tính thành phần.",
    },
    assumptions: {
      molarMass: (v: number) => `Khối lượng mol MMA = ${v} g/mol`,
      density: (v: number) => `Khối lượng riêng mặc định = ${v} kg/L (điều chỉnh 0,92–0,96)`,
      heatCapacity: (v: number) => `Nhiệt dung mặc định = ${v} kJ/(kg·K)`,
      heatOfPoly: (v: number) => `Nhiệt polymer hóa = ${v} kJ/mol`,
      vaporPressure: "Áp suất hơi = bảng cân bằng NOAA CHRIS (không phải áp suất bồn)",
      tempCurves: "Các đường nhiệt độ là kịch bản số học, không phải dự báo",
      conversion: "Tỷ lệ chuyển đổi là năng lượng tương đương, không phải thành phần đo được",
    },
  },

  faq: {
    items: [
      {
        q: "Đây có phải trang chính thức không? Nó có cho tôi biết nhà tôi có an toàn không?",
        a: "Không. Đây là một dự án giáo dục độc lập, không liên kết với bất kỳ cơ quan nào, và không thể xác định bất kỳ địa chỉ nào là an toàn. Chỉ lực lượng ứng phó chính thức mới có thể. Hãy theo dõi OCFA, Thành phố Garden Grove, Cal OES, EPA và Cơ quan Y tế Quận Cam.",
      },
      {
        q: "Methyl methacrylate (MMA) là gì?",
        a: "Một chất lỏng không màu, dễ cháy, dùng để sản xuất nhựa PMMA (acrylic). Ở nhiệt độ thường, nó chủ yếu ở thể lỏng với hơi phía trên, và có thể polymer hóa — liên kết hóa học thành chất rắn — đồng thời tỏa nhiệt.",
      },
      {
        q: "Vì sao nhiệt độ lại đáng lo đến vậy? Chẳng phải chỉ là nhiệt thôi sao?",
        a: "Mối lo không chỉ là nhiệt thông thường. Nếu MMA bắt đầu polymer hóa, chính phản ứng đó tỏa nhiệt. Nếu nhiệt này vượt quá khả năng làm mát hoặc làm tắc lối thoát hơi, áp suất và nguy cơ nứt vỡ có thể tăng. Vì vậy lực lượng ứng phó đang làm mát bồn.",
      },
      {
        q: "Không khí có mùi hắc hoặc giống tiệm làm móng. Điều đó có nguy hiểm không?",
        a: "Mùi không phải là phép đo an toàn — bạn có thể ngửi thấy MMA ở mức thấp hơn hoặc cao hơn nhiều so với mức đáng kể, nên mũi không phải thước đo nguy cơ đáng tin. Hãy dựa vào việc giám sát không khí chính thức theo thời gian thực và mọi hướng dẫn y tế.",
      },
      {
        q: "Bồn có nổ không?",
        a: "Điều đó chưa biết. Một vụ nứt vỡ dữ dội là mối nguy được công nhận nếu polymer hóa mất kiểm soát, nhưng không ai có thể dự đoán công khai liệu hay khi nào điều đó xảy ra — thông tin cần thiết không có sẵn (xem Những ẩn số đã biết). Dù sao cũng hãy tuân theo lệnh sơ tán.",
      },
      {
        q: "Dữ liệu trên trang này cập nhật đến mức nào?",
        a: "Trang hiển thị số liệu được báo cáo kèm mốc thời gian (xem Dòng thời gian), không phải dữ liệu trực tiếp, và chưa được kiểm chứng độc lập. Về tình hình hiện tại, hãy luôn dùng các kênh chính thức.",
      },
      {
        q: "Vì sao trang không đưa ra câu trả lời chính xác?",
        a: "Vì những biến số quan trọng nhất — áp suất thực, tình trạng van, mức chất ức chế, các điểm nóng bên trong và hơn nữa — không được công khai. Đưa con số chính xác sẽ là sự chính xác giả tạo. Các công cụ ở đây nhằm hiểu cơ chế và khoảng giá trị, không phải dự đoán.",
      },
      {
        q: "Làm sao để nhận cảnh báo chính thức?",
        a: "Hãy dùng các nguồn chính thức được liên kết ở đầu trang này và đăng ký nhận cảnh báo khẩn cấp của quận bạn. Các cơ quan đó mới đưa ra quyết định sơ tán, trú ẩn và quay trở lại.",
      },
    ],
  },

  glossary: {
    items: [
      { term: "Methyl methacrylate (MMA)", def: "Hóa chất trong bồn (CAS 80-62-6): một monomer lỏng không màu, dễ cháy, dùng để sản xuất nhựa acrylic." },
      { term: "Monomer", def: "Một phân tử nhỏ có thể kết hợp với nhiều bản sao của chính nó để tạo thành polymer. MMA là monomer; PMMA là polymer." },
      { term: "Polymer hóa", def: "Phản ứng liên kết các phân tử monomer thành chuỗi dài (một polymer). Với MMA, nó tỏa nhiệt (tỏa nhiệt)." },
      { term: "PMMA / acrylic", def: "Poly(methyl methacrylate) — loại nhựa rắn (acrylic, ví dụ Plexiglas) mà MMA tạo thành khi polymer hóa." },
      { term: "Tỏa nhiệt", def: "Một phản ứng giải phóng nhiệt. Polymer hóa tỏa nhiệt mất kiểm soát là mối lo trung tâm với bồn này." },
      { term: "Chất ức chế (chất ổn định)", def: "Một phụ gia kìm hãm polymer hóa không mong muốn trong quá trình lưu trữ. Nếu nó cạn hoặc bị vượt quá, nguy cơ phản ứng tăng." },
      { term: "Áp suất hơi", def: "Áp suất của hơi ở trạng thái cân bằng với chất lỏng tại một nhiệt độ nhất định. Nó tăng theo nhiệt độ — nhưng KHÔNG giống áp suất tổng bên trong bồn." },
      { term: "Khoảng trống đầu bồn", def: "Khoảng chứa hơi phía trên chất lỏng bên trong bồn." },
      { term: "Đoạn nhiệt", def: "Một trường hợp lý tưởng trong đó không có nhiệt nào bị loại bỏ. Giả định 'không loại bỏ nhiệt' của bộ ước tính là đoạn nhiệt; việc làm mát thực tế làm thay đổi bức tranh thật." },
      { term: "Luồng hơi", def: "Một đám hơi bị gió cuốn đi. Đường đi của nó phụ thuộc gió, địa hình và công trình, nên không phải đường thẳng cũng không phải vòng tròn hoàn hảo." },
      { term: "Tái ổn định", def: "Thêm chất ức chế trở lại bồn lớn để lấy lại sự ổn định. Hướng dẫn lưu ý điều này ở khoảng 45°C / 113°F." },
    ],
  },

  share: {
    title: "Hãy chia sẻ một cách có trách nhiệm",
    body:
      "Bảng thông tin này nhằm hiểu cơ chế và sự bất định. Đừng dùng nó để bỏ qua các lệnh chính thức về sơ tán, trú ẩn hoặc quay trở lại. Nếu chia sẻ, hãy chia sẻ cùng với các nguồn chính thức ở đầu trang — và nói rõ đây là ước tính giáo dục độc lập, không phải hướng dẫn từ bất kỳ cơ quan nào.",
    copyLink: "Sao chép liên kết",
    copied: "Đã sao chép!",
    share: "Chia sẻ",
    shareScenario: "Chia sẻ kịch bản này",
    revisitAt: "Chia sẻ hoặc xem lại trang này tại",
    message:
      "GKN Aerospace MMA Tank — Garden Grove — một ước tính minh bạch, lưu ý sự bất định. Không phải hướng dẫn chính thức; hãy tuân theo lệnh chính thức.",
  },

  footer: {
    line1Brand: "GKN Aerospace MMA Tank — Garden Grove.",
    line1:
      " Một dự án giáo dục độc lập, mã nguồn mở. Không liên kết với OCFA, GKN Aerospace, Thành phố Garden Grove, EPA hay Cal OES. Trang không xác định bất kỳ địa chỉ nào là an toàn.",
    line2:
      "Tất cả số liệu là giá trị được báo cáo hoặc giả định mang tính bất định thực sự. Hãy luôn tuân theo các chỉ dẫn khẩn cấp chính thức.",
  },
};
