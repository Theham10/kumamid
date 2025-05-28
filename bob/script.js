// 디자이너 데이터 배열
   const designers = [
      {
        name: "곽희진",
        img: "https://lh3.googleusercontent.com/wJ640HEZP5IAl18qhPcbmO13LGwKByQ0Z4PO223esW8fAh-krFPIm0fhlmNfLy_qjs_V3jX0Gy0zFvKPuDP5QlVYRs2uwCkW0bKNJPyqhjR_G__nbsmz=w800",
        link: "https://kumamid.com/Designer/view/425321",
        id: "425321",
        projectTitle: "모션으로 피어나다",
        projectDescription: "감정의 피어남을 모션 그래픽으로 표현한 작업입니다.",
        projectImg: "https://yourdomain.com/images/425321_project.jpg",
        email: "ghj_design@naver.com",
        instagram: "https://instagram.com/ghj_design"
      },
      {
        name: "김민주",
        img: "https://lh3.googleusercontent.com/NKDBAS9QpX9n9bEhP6hUhrdnJL_doFYtes5vzi3ZXpfVXJ0oERy8bFPLgEyhBh2soRFQ6f-xguFowpjJ8e_IJRWQT7flQw-Y70mU9sJxLjHNIO6E3277aQ=w800",
        link: "https://kumamid.com/Designer/view/425320",
        id: "425320"
      },
      {
        name: "김사랑",
        img: "https://lh3.googleusercontent.com/ZO-XHWjvHVXA8p7BzjcFhp0Vvl87HaVYZHUtbJ32RwT-9Ke9ARsFQjsU3Eqyt7bCsTCXpkn_S5eU1bdEztzH28KjpjrGpWIAScrJw0DDch3W2skYpVWoqA=w800",
        link: "https://kumamid.com/Designer/view/425319",
        id: "425319"
      },
      {
        name: "김은서",
        img: "https://lh3.googleusercontent.com/jd2kbQm64AV99SMioTUUl4xyuSBdZ4Qin6czG4B-FiiS5LSi0B01OTJW0tt4gH371-8vobFhT9OgZPCqvyoC_zZUM6HHlg9qPRvcy-uVPnwzjv8dynC0FA=w800",
        link: "https://kumamid.com/Designer/view/425318",
        id: "425318"
      },
      {
        name: "김참슬",
        img: "https://lh3.googleusercontent.com/B-sc0BDJ-49TDbLeN1UGTuNbLIMgAbggKq2xmhHNv7diHfEoBA4k4s0IOINp126cTCM8tnZc_KJDqO3J6-ah41cpeE_Yj5LIkMqS_7A7KhKBHCPjPnhKcg=w800",
        link: "https://kumamid.com/Designer/view/425317",
        id: "425317"
      },
      {
        name: "박지훈",
        img: "https://lh3.googleusercontent.com/awckjr_LEVseLHQ22Js8pZzd_tmmdxzZaGdDrW9ttlC1-HMzT-XAArDPG75o_V8ILzD5cZIjiFaiXVrdxJ3eBirTME1k9Njgurqe5f6ZYKIv8l1ZLvg-nw=w800",
        link: "https://kumamid.com/Designer/view/425316",
        id: "425316"
      },
      {
        name: "이수민",
        img: "https://lh3.googleusercontent.com/wn0ZiAWztZUzqEsKu1HrotLH30wSliOqlFxk7MHduSyHPnY8zO6eQ11yL0CdeDjH8IAUQ3Vj0GkNMXv05hup8s4_h2w4LPqmGEcY0K6BtV2EFTndIGb5DA=w800",
        link: "https://kumamid.com/Designer/view/425315",
        id: "425315"
      },
      {
        name: "최윤서",
        img: "https://lh3.googleusercontent.com/dlxupEmZD_rKHkCtVYBVIn95_ha5voV36PxceoSFMHmITgawyOUuQap4culg5MwQCbDF_9KOk-MGlbHftpFkzIt7g0hJqBVTKIDPxkiUTI8DkL_dcUsCHw=w800",
        link: "https://kumamid.com/Designer/view/425314",
        id: "425314"
      },
      {
        name: "정민지",
        img: "https://lh3.googleusercontent.com/CtW7yS33ooFHAHsJUdxhvLzyE21lIu_l7HSXEUZtW-KdxdvgYDUl3LIoL_Vsrcj2OzFydnbb4Ie_BEYBpi1fBat0hczgPJqDC9k_AW-w7ZfnZ5iPk2TPKw=w800",
        link: "https://kumamid.com/Designer/view/425313",
        id: "425313"
      },
      {
        name: "한지우",
        img: "https://lh3.googleusercontent.com/Ih-jMNrR8FhEn-h0LDqxCMFM8pWKFE66z8pCXLqkuVwn9_nsDVKJ1_VFGjxj2HMFFWVoXRP0lQXFaUagvj_JiHCWluhJVC_Z_8SFfFWN5qScw057mrs8xso=w800",
        link: "https://kumamid.com/Designer/view/425312",
        id: "425312"
      },
      {
        name: "김하늘",
        img: "https://lh3.googleusercontent.com/xFWB3TUE0hGROLS2z8-DL7Aqe78tt81GK0co7qwF7M79_mEzaQQgiDjS_S8PBm4QqD9ghb0p3WY1WqRdlp3JJ5sWYhOFDQ1RmKAmfAhqRALDJwvq1rjeIA=w800",
        link: "https://kumamid.com/Designer/view/425311",
        id: "425311"
      },
      {
        name: "이준호",
        img: "https://lh3.googleusercontent.com/wUnZKHY47jlVhJE4XVjuNjRgOcIf6q-PjOQHa-yJ5BnyXpdPA9jV9YzNijy-i8mT_YAQotLkeWjiQosrRuDnuQ4sCrcRfMhfKn228cJ2X5VlKtpRiEjDUbY=w800",
        link: "https://kumamid.com/Designer/view/425310",
        id: "425310"
      },
      {
        name: "박서연",
        img: "https://lh3.googleusercontent.com/boIpWsLjpz-8_LRX48_kUfboO94eEDmVBMV0lmluvlPk0pok5dHUgkFqaAjLFz0j5yc5GeInPvhd3eozRZzLBGTZvnHO6wlKYOBLyCINAsEslOzbPUNf4Q=w800",
        link: "https://kumamid.com/Designer/view/425309",
        id: "425309"
      },
      {
        name: "최민석",
        img: "https://lh3.googleusercontent.com/tRDtxi80AWhPGNH-eWDtD6686PWX2kcgqJ-AYHwQ_F7wAcGlXZ9JttwJYbkpm8UlO8MDlOX7rifL4IT_FJYSbO7QXr5fQ25qEMl1fPyRCwJK3j2-EnBxng=w800",
        link: "https://kumamid.com/Designer/view/425308",
        id: "425308"
      },
      {
        name: "정예린",
        img: "https://lh3.googleusercontent.com/HphIhqbCDk1OexfsxgOBlZB7rwY97T7cwCHSdnrY6PpSz6NaiHzngNnzDc1Bkc6WDak2dWg_EWSSBqydyYnxGPNXxPUPTCb2LX2rmwjpO2LiHbekS-nG=w800",
        link: "https://kumamid.com/Designer/view/425307",
        id: "425307"
      },
      {
        name: "한승우",
        img: "https://lh3.googleusercontent.com/y_GshxgLMCATrgwqXU9xpzWaNLzlwTMJqSzRKUNmGR4hukYN6ODVm_7B7phuac5LbFrVhMsJMFWmceyLPNOQS9K5J8rgonFitDCQTasgOS-e_A7C5OKjR7w=w800",
        link: "https://kumamid.com/Designer/view/425306",
        id: "425306"
      },
      {
        name: "김다은",
        img: "https://lh3.googleusercontent.com/TqOCLZEJLwnhU31xKSFqz5W-ObckkMLYHE4Jdm9Q_IVBl9blIUiXAMfSlKj4eG5mal0gB1b7VcpSInl2P7DLCs4DFF4AsRMvPVJsXpwntAGilF0S7NF792U=w800",
        link: "https://kumamid.com/Designer/view/425305",
        id: "425305"
      },
      {
        name: "이동현",
        img: "https://lh3.googleusercontent.com/6Z1mXmDnAjzCt8OTe0d9XxYmAKU2OaIH0iJkxIumwFz9vV0DaWvaaPgRQ9FMPzImcRLGAjC43ubJ_uFXpl1DUiWyeL8q8oy9IqFJC1J8-eY2k1RLx_2sTA=w800",
        link: "https://kumamid.com/Designer/view/425304",
        id: "425304"
      },
      {
        name: "박민지",
        img: "https://lh3.googleusercontent.com/vKIL6ZyvhyAYv5olcpsTbfgWBfJW9NBnC8eG25Qkg7-DlZdpm97XEFuWLoYnWKUu-OuKNZn14y0-dZSR2Cc-KZ2hTP0OuNx11tL8pHG450-VYu-1bfb5BQ=w800",
        link: "https://kumamid.com/Designer/view/425303",
        id: "425303"
      },
      {
        name: "최지훈",
        img: "https://lh3.googleusercontent.com/8cHmr5sSHNgisTsT8wVZbKC9l7i4fHNIsEpoXxr-wqMx2mipivN3P4vuYfFSKm3qjYG3Gy0jKROZ5DRq52xkz6OQ5XP5q8D-ChACp3TvsQGaHwdoBQXv=w800",
        link: "https://kumamid.com/Designer/view/425302",
        id: "425302"
      },
      {
        name: "정서윤",
        img: "https://lh3.googleusercontent.com/pCoUY7HEhS5s_xUd_Rxrl2xUMlJnsgI22Wbb8zPtr6vMoJSFt5uPlJQFHjDk_WamNkIY6s7yRRWZ2oOg5ZFCXHMyx0LYN23RMpya_OfKnGM7xynNmX4P5w=w800",
        link: "https://kumamid.com/Designer/view/425301",
        id: "425301"
      },
      {
        name: "한지원",
        img: "https://lh3.googleusercontent.com/Qo_9W48y4ToHFQP8_j8saYm3ST2WG_f2Z1MRhOPNryo8wn4kNfFV9pOaOhzHKpxdMFM_JnyeOtihK0TpcOFkcKw3YvM_NjYdx_UMjtSmSfHtAn_lh4P2=w800",
        link: "https://kumamid.com/Designer/view/425300",
        id: "425300"
      },
      {
        name: "김민재",
        img: "https://lh3.googleusercontent.com/IqZXglEcaBE0WEyESeCWwG8aBj4R847jE2R-ElXV2Aivhai6u5ZfniXa3MGaJFYjFumj5rp81uF4NyiyBZjlqgiMdJFwfb5spqs2-VmUGh0-lX5WIKheAA=w800",
        link: "https://kumamid.com/Designer/view/425299",
        id: "425299"
      },
      {
        name: "이하늘",
        img: "https://lh3.googleusercontent.com/KCx2jZKHBk9a0lmzGuQ5YN-7DWStj8cMGt08b0-sM1n2BMxiy5IeYyEOkcJpLOdYqI6qyaelJOiXr7mEtYsD3Qxv71ofebGESI4thS0_e3UWvmQd-rSPvQ=w800",
        link: "https://kumamid.com/Designer/view/425298",
        id: "425298"
      },
      {
        name: "박서준",
        img: "https://lh3.googleusercontent.com/rijHlexeTtBvIAdOZb8QsNsDRWbXwFWqtrx07JBaPVJ-dyxrRifacAS21Hstj1uxu7Gu0G-gDnEPJLCOZ5WBRt3kk58hgS5S3Xgu2rVADRzyckSDvpas=w800",
        link: "https://kumamid.com/Designer/view/425297",
        id: "425297"
      },
      {
        name: "최유진",
        img: "https://lh3.googleusercontent.com/YVhsoWZS4NqkWTW1oPZQM8iqnGp5ckDhaQb8tUdMvQy-sJ3Km9EtKkFMtLAEFiSWrARG-5S7rA9Y7AqWP9cbZroTSnO6jsRlzXWQUYQ8GRauc8jm3ahs=w800",
        link: "https://kumamid.com/Designer/view/425296",
        id: "425296"
      },
      {
        name: "정민호",
        img: "https://lh3.googleusercontent.com/PP11qYVEwH3i2Xxlap6Th3uczobbrwqLxlyT_RuWx7sxcvEzWy5d1CtzzI-QZS1Ps-KyU3S9kM0v4nsPvhzOW8u2Grk23oYP6dFKmK5GxSX3oLGc7f7WA3A=w800",
        link: "https://kumamid.com/Designer/view/425295",
        id: "425295"
      },
      {
        name: "한예은",
        img: "https://lh3.googleusercontent.com/04nIeMEB7M3vQn_rwyCOtyoi5SU3mJDw6fBMLJm_t1oSW-UZWZ4vD_DAwxtVg90ckrs-_bU-w0xGRArFDtfxl-OKYCHLIs2LmBd-pE7OioKC96g4ljmF3Hw=w800",
        link: "https://kumamid.com/Designer/view/425294",
        id: "425294"
      },
      {
        name: "김지훈",
        img: "https://lh3.googleusercontent.com/otryrkfkb9bRr7xlzB8Bi1ReZiO6Ipk0Exj36QU-W7JVXzkruHFqf4PZFw-iFyR1VVArroOd1kh-fjmTsO5BbiAFWxxlwrgSxU2ucrol9NTEinxCBeDi=w800",
        link: "https://kumamid.com/Designer/view/425293",
        id: "425293"
      },
      {
        name: "이서연",
        img: "https://lh3.googleusercontent.com/6WZp1gwm4CS_bnscLxlirhRHmq_3Ur3pnx1AsZe2UrXW7z45pgp1ocJ2JSQKC6ocC7dbaxvOR3zHiJ9-O2k9WYM9xlq5Lq1hoUjPYp1jh_vIvIT8NYsu=w800",
        link: "https://kumamid.com/Designer/view/425292",
        id: "425292"
      },
      {
        name: "박준영",
        img: "https://lh3.googleusercontent.com/PpDNYsPlZFHZufxhAZ3sYlMC4CsT-D-FSKdbAlfZvHrKMHlWYUKPxM2qIqkUjyOpm5migeIBwJwnGXSNMNHaj4xH062N2droaxWcJZu-Rt7sj82HrwgLKh4=w800",
        link: "https://kumamid.com/Designer/view/425291",
        id: "425291"
      },
      {
        name: "최수빈",
        img: "https://lh3.googleusercontent.com/ebQmks6OQlfFft89aZxldcTN8rFpXz0AbhqRfp7w-J7xlc1kyEvSscvgTF7dg0PE5y1lKGbdjirZNc2wlb6Q5yZ3K-erh6WY6aSCfLMudfQCF1cs4B4R=w800",
        link: "https://kumamid.com/Designer/view/425290",
        id: "425290"
      },
      {
        name: "정다은",
        img: "https://lh3.googleusercontent.com/9Cc9Qb2PVw0X15tr7baEtmzxe5hrOoZgH9Wo_50l3DVuem7XlpBibiHhcZIgeyCkcNnwI9M7nB8vHE8zk5L87JUwhW0XhPF-8UNmq8OjI5lRPDXNuwyOng=w800",
        link: "https://kumamid.com/Designer/view/425289",
        id: "425289"
      },
      {
        name: "한지민",
        img: "https://lh3.googleusercontent.com/xvaFgbFsh5B7DR9xystrg0wpJ4rofEf_Z2g-kyNOdzog3h4rd8qHgem94Bt-lv5DFEC8cZwf2_r322DcHBETICXC4pUVlj0EyI64NnVQ2AeV6z33Iwv9qn0=w800",
        link: "https://kumamid.com/Designer/view/425288",
        id: "425288"
      },
      {
        name: "김태현",
        img: "https://lh3.googleusercontent.com/zlQ27QKUa8ezq2Ksk5_lHlQShnezdK0Mu3BGRT0wfa_wd0GHEJqolWRP4pS_Ml-pDTdx8Y3JBKlZTcQt8UMhIHFaj5mBRpSuked1KEe_kHlMPaenY8sapA=w800",
        link: "https://kumamid.com/Designer/view/425287",
        id: "425287"
      },
      {
        name: "박지민",
        img: "https://lh3.googleusercontent.com/vlJac-WkQpcMyFXocD1r4l6dGpiBdrJ0jfv71aymvIfb3TDjVzmqJqVdP74elqeUJjqeo3lWRYGTVyu5ThjWDKJ-9v4st2Ynd63QmZq16VvFGwU2DwYMEA=w800",
        link: "https://kumamid.com/Designer/view/425279",
        id: "425279"
      },
      {
        name: "홍은택",
        img: "https://lh3.googleusercontent.com/N74YOKiyvOpHzTn-5DUbUiReTIjhNIFdv1svClu1VSpQ9qsnd4rMCZ9GOA1SXtlZRHu-AmjN9r_7Tp5-9214kQKa8nGuUrMsPl2jik2Ll4MohvUPtBh8JQ=w800",
        link: "https://kumamid.com/Designer/view/425281",
        id: "425281"
      },
      {
        name: "정진모",
        img: "https://lh3.googleusercontent.com/Gqa4axJfcev4ERMcrhpORk2yPQtLU1P_N1QXFj1r6R9i9_aaDQOOCbXa2CRQ4_s04JRepl0-kkMWvp0pNT1lB_alHz8Hi7ajlz4arZ1UDXG_Z7LEWJSL=w800",
        link: "https://kumamid.com/Designer/view/425282",
        id: "425282"
      },
      {
        name: "최명진",
        img: "https://lh3.googleusercontent.com/1m30vUDVOsjSuUOPFahOfkpNrw1SYcpLOYTLd8A7XNzETS65bI2GfE-mFLHPt9S-7NeOtLIjbU9gDil1mpHCD9dvdJOmIVhDtScSAtmzL2wZ-Yz2EBe-=w800",
        link: "https://kumamid.com/Designer/view/425283",
        id: "425283"
      },
      {
        name: "조민국",
        img: "https://lh3.googleusercontent.com/LVgk6hMfltUKPKW9xwS_miLPOUV_PfCFiQ2j1NBy4m72yS_N3KHUmWCchU5MXqR_S-IB5mS4SCukaJ2-inSCmX4PJl3IOG6gHY-UErecDmCurDqyeyvZwA=w800",
        link: "https://kumamid.com/Designer/view/425284",
        id: "425284"
      },{
          name: "최효민",
        img: "https://lh3.googleusercontent.com/f2RLROf-ozjnluICs4C6D48ZPPDRRt_Ggo0xfRpA-gtEavSHZmU1uzO9TzPe1fK-upcxCYxSHerMKPR9GHNFl45RT0TUE9q4oUHJYhkXgjGCYR8kL6xYxA=w800",
        link: "https://kumamid.com/Designer/view/425283",
        id: "425283"
      },
      {
        name: "한유정",
        img: "https://lh3.googleusercontent.com/_kL7ORDwIjFsfRyUAR9wnVNPPB1QLs4xBD6pznVG_Zyj-fQQNkVHkoAJUy80NUtO68iO_hMFbkWMfU_XDm-hhzv-FTUjwhl0lZ0KFodtrphGMJO-uoXL=w800",
        link: "https://kumamid.com/Designer/view/425282",
        id: "425282"
      },
      {
        name: "홍은택",
        img: "https://lh3.googleusercontent.com/N74YOKiyvOpHzTn-5DUbUiReTIjhNIFdv1svClu1VSpQ9qsnd4rMCZ9GOA1SXtlZRHu-AmjN9r_7Tp5-9214kQKa8nGuUrMsPl2jik2Ll4MohvUPtBh8JQ=w800",
        link: "https://kumamid.com/Designer/view/425281",
        id: "425281"
      },
      {
        name: "홍채은",
        img: "https://lh3.googleusercontent.com/W0a-ErhoHdvSOHWzmoR9bRD_YVg_Y7cBdhZDbtkBBxgst_s-zs7i8VN8yM3dfiUXkd8zXBtlw-P4CPLVS5Z5NQsDN49Uk17CAHADSFiBrBeXnWRF9x_4=w800",
        link: "https://kumamid.com/Designer/view/425280",
        id: "425280"
      },
    ];

// DOM에 디자이너 카드 그리기
const grid = document.getElementById('designerGrid');

designers.forEach(d => {
  // Extract id from the link and assign as a new property
  d.id = d.link.split('/').pop();
  const div = document.createElement('div');
  // Remove or do not set div.className = 'grid-item'; since grid-item is now on the <a>
  div.innerHTML = `
    <a href="./Detail/view.html?id=${d.id}" class="grid-item" data-id="${d.id}">
      <div class="designer-img-wrap">
        <img src="${d.img}" alt="${d.name}_프로필" class="img-responsive">
      </div>
      <h2 class="head_title" data-edit="true" data-selector="h2.head_title">
        <span>${d.name}</span>
      </h2>
    </a>
  `;
  grid.appendChild(div);
});