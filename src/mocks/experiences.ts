export interface ExperienceDetail {
  id: string;
  slug: string;
  img: string;
  gallery: string[];
  titleKey: string;
  subtitleKey: string;
  fullDescKey: string;
  purposeKey: string;
  durationKey: string;
  groupSizeKey: string;
  languageKey: string;
  includesKey: string;
  notIncludesKey: string;
  meetingPointKey: string;
  priceNoteKey: string;
  itinerary: { timeKey: string; activityKey: string }[];
}

export const experiencesData: Record<string, ExperienceDetail> = {
  paseo: {
    id: 'exp1',
    slug: 'paseo-historico-baile-latino',
    img: 'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/d95d880e-731e-4ffc-8164-ebc7619a7f22_barrio-lastarria-hero.jpg?v=a306b20921552eeeb5f74fbac60cc56d',
    gallery: [
      'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/1edfd3cf-9841-48c6-af2f-644fcc104cec_plaza_armas.jpg?v=f0c602f3d44a6fc8570b653f75492b1c',
      'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/7e185f36-fe7d-4d72-b9c6-fdd787f6da7b_museo_nacional.jpg?v=e1c4e85bb346ead0d43056db7251f4c8',
      'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/a2f5b152-6144-4809-b35e-e14dad403492_gam_baile.jpeg?v=79e33c513d00494d2b1398ef6724add3',
      'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/7be4cedb-eeb3-4c79-b7ef-140949f8b385_cerro_santa_lucia.jpg?v=379d824896611fc9c731d6d185f22423',
    ],
    titleKey: 'exp1_title',
    subtitleKey: 'exp1_subtitle',
    fullDescKey: 'exp1_full_desc',
    purposeKey: 'exp1_purpose',
    durationKey: 'exp1_duration',
    groupSizeKey: 'exp1_group_size',
    languageKey: 'exp1_language',
    includesKey: 'exp1_includes',
    notIncludesKey: 'exp1_not_includes',
    meetingPointKey: 'exp1_meeting_point',
    priceNoteKey: 'exp1_price_note',
    itinerary: [
      { timeKey: 'exp1_time1', activityKey: 'exp1_act1' },
      { timeKey: 'exp1_time2', activityKey: 'exp1_act2' },
      { timeKey: 'exp1_time3', activityKey: 'exp1_act3' },
      { timeKey: 'exp1_time4', activityKey: 'exp1_act4' },
      { timeKey: 'exp1_time5', activityKey: 'exp1_act5' },
    ],
  },
  noche: {
    id: 'exp2',
    slug: 'noche-latina-santiago',
    img: 'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/f67d257d-40c2-4e72-bf67-593b269d4f0a_patio-bellavista.webp?v=16dc815b05371bbc734b392afb502d3f',
    gallery: [
      'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/9c2eead3-457a-49e3-b826-a4a1b91e2fd4_barrio_bellavista.webp?v=db3a58c7e474c2d6088fd80c2b98a750',
      'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/3a932233-fbe5-4df6-947c-33d004351126_club-orixas.jpg?v=47c683f9b7c822e6fc639b20177ad9ab',
      'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/3afd57af-b804-490e-85a1-04bdf0f83de1_havana-salsa.jpg?v=3be318526de3b7804cb3e9b37baf383c',
      'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/e565a900-0e8e-40a3-babe-a8a8e96ced35_maestra-vida.jpg?v=389b30320e13abc3e30cb02860f8ab85',
    ],
    titleKey: 'exp2_title',
    subtitleKey: 'exp2_subtitle',
    fullDescKey: 'exp2_full_desc',
    purposeKey: 'exp2_purpose',
    durationKey: 'exp2_duration',
    groupSizeKey: 'exp2_group_size',
    languageKey: 'exp2_language',
    includesKey: 'exp2_includes',
    notIncludesKey: 'exp2_not_includes',
    meetingPointKey: 'exp2_meeting_point',
    priceNoteKey: 'exp2_price_note',
    itinerary: [
      { timeKey: 'exp1_time1', activityKey: 'exp2_act1' },
      { timeKey: 'exp1_time2', activityKey: 'exp2_act2' },
      { timeKey: 'exp1_time3', activityKey: 'exp2_act3' },
      { timeKey: 'exp1_time4', activityKey: 'exp2_act4' },
      { timeKey: 'exp1_time5', activityKey: 'exp2_act5' },
    ],
  },
  expats: {
    id: 'exp3',
    slug: 'baile-social-expats',
    img: 'https://public.readdy.ai/ai/img_res/edited_97e3f05ebb787817aded770dbefbecc8_c429d3e4.jpg',
    gallery: [
      'https://public.readdy.ai/ai/img_res/edited_dd1579c44dbb835d624eb3ea21ce03d0_55385ec4.jpg',
      'https://public.readdy.ai/ai/img_res/edited_dd1579c44dbb835d624eb3ea21ce03d0_e280a011.jpg',
      'https://public.readdy.ai/ai/img_res/edited_dd1579c44dbb835d624eb3ea21ce03d0_4ebdaba3.jpg',
      'https://public.readdy.ai/ai/img_res/edited_dd1579c44dbb835d624eb3ea21ce03d0_971fa5c5.jpg',
    ],
    titleKey: 'exp3_title',
    subtitleKey: 'exp3_subtitle',
    fullDescKey: 'exp3_full_desc',
    purposeKey: 'exp3_purpose',
    durationKey: 'exp3_duration',
    groupSizeKey: 'exp3_group_size',
    languageKey: 'exp3_language',
    includesKey: 'exp3_includes',
    notIncludesKey: 'exp3_not_includes',
    meetingPointKey: 'exp3_meeting_point',
    priceNoteKey: 'exp3_price_note',
    itinerary: [
      { timeKey: 'exp3_time1', activityKey: 'exp3_act1' },
      { timeKey: 'exp3_time2', activityKey: 'exp3_act2' },
      { timeKey: 'exp3_time3', activityKey: 'exp3_act3' },
      { timeKey: 'exp3_time4', activityKey: 'exp3_act4' },
      { timeKey: 'exp3_time5', activityKey: 'exp3_act5' },
    ],
  },
  privado: {
    id: 'exp4',
    slug: 'experiencia-privada-latina',
    img: 'https://readdy.ai/api/search-image?query=Couple%20walking%20hand%20in%20hand%20through%20elegant%20heritage%20street%20in%20Santiago%20Chile%20warm%20golden%20hour%20light%20colonial%20architecture%20romantic%20atmosphere%20sophisticated%20travel%20photography&width=800&height=600&seq=exp4-private&orientation=landscape',
    gallery: [
      'https://readdy.ai/api/search-image?query=Couple%20on%20private%20guided%20tour%20through%20Santiago%20Chile%20historic%20district%20colonial%20buildings%20and%20cobblestone%20streets%20warm%20afternoon%20light%20exclusive%20travel%20experience%20candid%20photography&width=800&height=600&seq=exp4g1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Exclusive%20private%20salsa%20dance%20lesson%20for%20a%20couple%20in%20bright%20modern%20studio%20Santiago%20Chile%20instructor%20teaching%20personalized%20steps%20elegant%20casual%20attire%20warm%20atmosphere&width=800&height=600&seq=exp4g2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Couple%20laughing%20while%20dancing%20together%20in%20beautiful%20Santiago%20Chile%20setting%20with%20host%20capturing%20photos%20on%20camera%20golden%20hour%20light%20joyful%20travel%20memory&width=800&height=600&seq=exp4g3&orientation=landscape',
    ],
    titleKey: 'exp4_title',
    subtitleKey: 'exp4_subtitle',
    fullDescKey: 'exp4_full_desc',
    purposeKey: 'exp4_purpose',
    durationKey: 'exp4_duration',
    groupSizeKey: 'exp4_group_size',
    languageKey: 'exp4_language',
    includesKey: 'exp4_includes',
    notIncludesKey: 'exp4_not_includes',
    meetingPointKey: 'exp4_meeting_point',
    priceNoteKey: 'exp4_price_note',
    itinerary: [
      { timeKey: 'exp4_time1', activityKey: 'exp4_act1' },
      { timeKey: 'exp4_time2', activityKey: 'exp4_act2' },
      { timeKey: 'exp4_time3', activityKey: 'exp4_act3' },
      { timeKey: 'exp4_time4', activityKey: 'exp4_act4' },
      { timeKey: 'exp4_time5', activityKey: 'exp4_act5' },
    ],
  },
  noche_premium: {
    id: 'exp5',
    slug: 'noche-latina-premium',
    img: 'https://readdy.ai/api/search-image?query=Luxury%20evening%20in%20upscale%20Santiago%20Chile%20lounge%20elegant%20Latin%20dance%20club%20with%20ambient%20lighting%20champagne%20glasses%20sophisticated%20crowd%20latin%20music%20atmosphere%20premium%20nightlife%20photography&width=800&height=600&seq=exp5-premium-night&orientation=landscape',
    gallery: [
      'https://readdy.ai/api/search-image?query=Private%20executive%20car%20arriving%20at%20elegant%20salsa%20club%20in%20Santiago%20Chile%20at%20night%20city%20lights%20upscale%20neighborhood%20premium%20nightlife%20experience&width=800&height=600&seq=exp5g1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Group%20of%20well%20dressed%20friends%20learning%20salsa%20in%20exclusive%20dance%20studio%20Santiago%20Chile%20modern%20interior%20with%20mirrors%20and%20ambient%20lighting%20premium%20class%20experience&width=800&height=600&seq=exp5g2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Elegant%20Latin%20nightclub%20interior%20Santiago%20Chile%20with%20live%20band%20playing%20salsa%20crowd%20dancing%20sophisticated%20atmosphere%20warm%20lighting%20premium%20venue%20experience&width=800&height=600&seq=exp5g3&orientation=landscape',
    ],
    titleKey: 'exp5_title',
    subtitleKey: 'exp5_subtitle',
    fullDescKey: 'exp5_full_desc',
    purposeKey: 'exp5_purpose',
    durationKey: 'exp5_duration',
    groupSizeKey: 'exp5_group_size',
    languageKey: 'exp5_language',
    includesKey: 'exp5_includes',
    notIncludesKey: 'exp5_not_includes',
    meetingPointKey: 'exp5_meeting_point',
    priceNoteKey: 'exp5_price_note',
    itinerary: [
      { timeKey: 'exp5_time1', activityKey: 'exp5_act1' },
      { timeKey: 'exp5_time2', activityKey: 'exp5_act2' },
      { timeKey: 'exp5_time3', activityKey: 'exp5_act3' },
      { timeKey: 'exp5_time4', activityKey: 'exp5_act4' },
      { timeKey: 'exp5_time5', activityKey: 'exp5_act5' },
    ],
  },
  privado_premium: {
    id: 'exp6',
    slug: 'experiencia-privada-premium',
    img: 'https://readdy.ai/api/search-image?query=Exclusive%20private%20Latin%20dance%20experience%20in%20Santiago%20Chile%20elegant%20couple%20dancing%20salsa%20in%20upscale%20venue%20with%20city%20skyline%20backdrop%20luxury%20travel%20concierge%20service%20photography%20warm%20sophisticated%20lighting&width=800&height=600&seq=exp6-premium-private&orientation=landscape',
    gallery: [
      'https://readdy.ai/api/search-image?query=Couple%20receiving%20private%20concierge%20service%20at%20luxury%20hotel%20lobby%20Santiago%20Chile%20elegant%20setting%20personalized%20travel%20experience%20exclusive%20attention&width=800&height=600&seq=exp6g1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Professional%20photographer%20capturing%20couple%20dancing%20salsa%20in%20beautiful%20Santiago%20Chile%20studio%20with%20city%20view%20artistic%20lighting%20premium%20private%20experience&width=800&height=600&seq=exp6g2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Luxury%20executive%20vehicle%20at%20night%20in%20Santiago%20Chile%20picking%20up%20elegant%20couple%20after%20salsa%20night%20premium%20private%20transport%20city%20lights&width=800&height=600&seq=exp6g3&orientation=landscape',
    ],
    titleKey: 'exp6_title',
    subtitleKey: 'exp6_subtitle',
    fullDescKey: 'exp6_full_desc',
    purposeKey: 'exp6_purpose',
    durationKey: 'exp6_duration',
    groupSizeKey: 'exp6_group_size',
    languageKey: 'exp6_language',
    includesKey: 'exp6_includes',
    notIncludesKey: 'exp6_not_includes',
    meetingPointKey: 'exp6_meeting_point',
    priceNoteKey: 'exp6_price_note',
    itinerary: [
      { timeKey: 'exp6_time1', activityKey: 'exp6_act1' },
      { timeKey: 'exp6_time2', activityKey: 'exp6_act2' },
      { timeKey: 'exp6_time3', activityKey: 'exp6_act3' },
      { timeKey: 'exp6_time4', activityKey: 'exp6_act4' },
      { timeKey: 'exp6_time5', activityKey: 'exp6_act5' },
    ],
  },
};

export const experienceList = Object.values(experiencesData);