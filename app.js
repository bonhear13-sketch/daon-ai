/**
 * 김인숙 강사 (다온샘) — 공식 웹사이트 인터랙션 & 관리자 대시보드 시스템
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Header scroll effect & Mobile Menu
  // ==========================================================================
  const siteHeader = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('active');
      mobileMenu.style.display = isActive ? 'flex' : 'none';
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // 2. Scroll Reveal Animations
  // ==========================================================================
  const fadeElements = document.querySelectorAll('.fade-in-up');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ==========================================================================
  // 3. Curriculum Data & Modal
  // ==========================================================================
  const programData = {
    ai: {
      category: '생성형 AI & 챗GPT',
      title: 'AI 챗GPT 전문지도사 2급 자격과정',
      target: '공공기관 임직원, 소상공인, 강사 희망자, 업무 혁신이 필요한 누구나',
      desc: '단 3일(총 12시간)의 실습 중심 투자로 챗GPT와 생성형 AI의 핵심을 마스터하고, 다올플러스 사회적협동조합 연계 공인 민간자격증을 취득하는 실전 과정입니다.',
      table: [
        { session: '1회차 (4시간)', title: '생성형 AI 이해와 프롬프트 엔지니어링 기초', content: '챗GPT 원리 이해, 효과적인 질문법, 특수기호(###, [ ])를 활용한 명확한 구조화 지시문 작성법' },
        { session: '2회차 (4시간)', title: '맞춤형 AI 비서와 실무 업무 자동화', content: 'Custom Instructions(맞춤형 지시사항) 설정, 나만의 특화 AI Gems 만들기, 기획서/보고서 작성 실습' },
        { session: '3회차 (4시간)', title: '멀티모달 이미지 생성 및 자격 검정', content: '생성형 이미지 제작, 저작권 및 윤리, 실전 모의 강의 및 지도사 2급 자격 검정 평가' }
      ]
    },
    smartphone: {
      category: '스마트폰 & 디지털 리터러시',
      title: '스마트폰활용지도사 & 디지털 공쌤 12주 과정',
      target: '시니어 어르신, 주부, 디지털 강사 활동을 희망하는 주민',
      desc: '광산공유센터에서 검증된 12주 완성 프로그램으로, 스마트폰 기본 조작부터 생활 편의 앱 마스터, 나아가 이웃에게 재능 나눔을 실천하는 공쌤 강사로 성장합니다.',
      table: [
        { session: '1~4주차', title: '스마트폰 기본 최적화 및 생활 필수 앱', content: '기기 설정 최적화, 3초 만에 브라우저 캐시·쿠키 정리하기, 카카오톡 200% 숨은 기능' },
        { session: '5~8주차', title: '스마트 일상 및 모바일 행정·금융', content: '정부24·모바일 신분증, 은행·페이 결제, 코레일·고속버스 예매 및 지도 내비게이션 완벽 활용' },
        { session: '9~12주차', title: '강사 지도 역량 강화 및 자격 취득', content: '교안 기획, 시니어 눈높이 강의 스피치 실습, 스마트폰활용지도사 자격증 취득 및 수료' }
      ]
    },
    marketing: {
      category: 'SNS 마케팅 & 유튜브',
      title: '소상공인 SNS 블로그 마케팅 & 유튜브 크리에이터',
      target: '소상공인, 자영업자, 1인 창업가, 퍼스널 브랜딩 희망자',
      desc: '비싼 광고비 없이 내 가게와 상품을 알리는 네이버 스마트블록 상위 노출 SEO 글쓰기와 스마트폰 하나로 끝내는 숏폼/릴스 영상 편집 실무입니다.',
      table: [
        { session: '1주차', title: '네이버 블로그 알고리즘과 키워드 전략', content: '내 사업에 맞는 황금 키워드 발굴법, 스마트블록 및 뷰탭 검색 상위 노출 공식' },
        { session: '2주차', title: '클릭을 부르는 매혹적인 콘텐츠 기획', content: '가독성 높은 모바일 최적화 레이아웃, 신뢰를 주는 프로필 세팅 및 브랜딩' },
        { session: '3주차', title: '스마트폰으로 완성하는 1분 숏폼/릴스', content: 'CapCut 컷편집, 자막 자동 생성, 인기 배경음악 삽입 및 인스타그램 업로드' },
        { session: '4주차', title: '고객 유치 및 매출 전환 실전 컨설팅', content: '플레이스 지도 연동, 후기 이벤트 기획, 1:1 맞춤형 피드백 및 운영 전략 점검' }
      ]
    },
    healing: {
      category: '기관 워크숍 & 힐링',
      title: '관공서·기업 맞춤 출강 & 아로마 힐링 워크숍',
      target: '공공기관 공무원, 기업 임직원 워크숍, 복지관, 문화센터',
      desc: '과중한 전산 업무와 디지털 피로도에 지친 현대인을 위해, 스마트워크 효율화 특강과 천연 아로마테라피 블렌딩 실습을 유기적으로 결합한 힐링 프로그램입니다.',
      table: [
        { session: '1부 (90분)', title: '스마트워크 & 생성형 AI 생산성 특강', content: '업무 시간을 절반으로 줄여주는 챗GPT 공공문서·회의록 요약, 최신 AI 툴 활용법' },
        { session: '2부 (90분)', title: '디지털 디톡스 & 천연 아로마 힐링', content: '스트레스 지수 완화, 천연 에센셜 오일의 효능 이해, 나만의 맞춤 롤온/룸스프레이 제작' }
      ]
    }
  };

  // Program Filtering
  const filterPills = document.querySelectorAll('.filter-pill');
  const programCards = document.querySelectorAll('.program-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Curriculum Detail Modal
  const curriculumModal = document.getElementById('curriculumModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalTarget = document.getElementById('modalTarget');
  const modalDesc = document.getElementById('modalDesc');
  const curriculumTable = document.getElementById('curriculumTable');
  const modalApplyBtn = document.getElementById('modalApplyBtn');
  let activeProgramKey = null;

  const openCurriculumModal = (programKey) => {
    const data = programData[programKey];
    if (!data) return;

    activeProgramKey = programKey;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalTarget.textContent = `권장 대상: ${data.target}`;
    modalDesc.textContent = data.desc;

    curriculumTable.innerHTML = `
      <thead>
        <tr>
          <th>구분</th>
          <th>주제 및 상세 내용</th>
        </tr>
      </thead>
      <tbody>
        ${data.table.map(row => `
          <tr>
            <th>${row.session}</th>
            <td>
              <strong style="color: var(--accent-navy); display: block; margin-bottom: 0.25rem;">${row.title}</strong>
              <span>${row.content}</span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;

    curriculumModal.classList.add('active');
    curriculumModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCurriculumModal = () => {
    curriculumModal.classList.remove('active');
    curriculumModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-program]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const programKey = trigger.getAttribute('data-program');
      openCurriculumModal(programKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCurriculumModal);
  if (curriculumModal) {
    curriculumModal.addEventListener('click', (e) => {
      if (e.target === curriculumModal) closeCurriculumModal();
    });
  }

  if (modalApplyBtn) {
    modalApplyBtn.addEventListener('click', () => {
      closeCurriculumModal();
      const courseSelect = document.getElementById('courseSelect');
      const messageContent = document.getElementById('messageContent');
      const contactSection = document.getElementById('contact');

      if (activeProgramKey && programData[activeProgramKey]) {
        const prod = programData[activeProgramKey];
        if (courseSelect) courseSelect.value = activeProgramKey;
        if (messageContent) {
          messageContent.value = `[${prod.title}] 출강 일정 및 견적 상담 문의드립니다.`;
          messageContent.focus();
        }
      }
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 4. Toast Notification Utility
  // ==========================================================================
  const showToast = (message, icon = '✔') => {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color: var(--accent-gold); font-size: 1.1rem; font-weight: bold;">${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  };

  // ==========================================================================
  // 5. Inquiries Store (localStorage Persistence)
  // ==========================================================================
  const INQUIRIES_STORAGE_KEY = 'daon_inquiries_db';

  const defaultSampleInquiries = [
    {
      id: 'inq-1726050000001',
      clientName: '박미숙 주무관',
      clientPhone: '010-3344-5566',
      orgName: '광주광역시 동구청 주민자치과',
      courseKey: 'ai',
      courseTitle: 'AI 챗GPT 전문지도사 자격과정',
      lectureDate: '10월 둘째 주 평일 오후 (협의 가능)',
      audienceInfo: '구청 공무원 및 주민 리더 25명',
      messageContent: '구청 대회의실에서 3일 단기 집중 과정으로 챗GPT 프롬프트 엔지니어링 및 2급 자격증 취득 연계 특강 진행을 희망합니다. 견적서 및 커리큘럼 공문 요청드립니다.',
      createdAt: '2026-09-11 14:35',
      status: 'pending' // 'pending' or 'completed'
    },
    {
      id: 'inq-1726050000002',
      clientName: '김성수 이사장',
      clientPhone: '010-7788-9900',
      orgName: '빛고을 마을사회적협동조합',
      courseKey: 'smartphone',
      courseTitle: '스마트폰 활용 및 디지털 공쌤 양성',
      lectureDate: '11월 초 시작 (주 1회, 총 8회차)',
      audienceInfo: '조합원 및 마을 시니어 15명',
      messageContent: '광산공유센터 공쌤 과정 소식을 블로그에서 보았습니다. 우리 조합에서도 주민들이 스스로 스마트폰을 배워 재능 나눔을 할 수 있는 강사 양성 커리큘럼 출강을 의뢰합니다.',
      createdAt: '2026-09-08 10:20',
      status: 'completed'
    }
  ];

  const getStoredInquiries = () => {
    try {
      const data = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(defaultSampleInquiries));
        return defaultSampleInquiries;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse inquiries from localStorage', e);
      return defaultSampleInquiries;
    }
  };

  const saveInquiries = (inquiries) => {
    try {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save inquiries to localStorage', e);
    }
  };

  // ==========================================================================
  // 6. Contact Form Submission (Real-time Save to Store)
  // ==========================================================================
  const inquiryForm = document.getElementById('inquiryForm');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  if (inquiryForm && formSubmitBtn) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientName = document.getElementById('clientName').value.trim();
      const clientPhone = document.getElementById('clientPhone').value.trim();
      const orgName = document.getElementById('orgName').value.trim() || '개인 의뢰';
      const courseSelect = document.getElementById('courseSelect');
      const courseKey = courseSelect.value;
      const courseTitle = courseSelect.options[courseSelect.selectedIndex].text;
      const lectureDate = document.getElementById('lectureDate').value.trim() || '협의 필요';
      const audienceInfo = document.getElementById('audienceInfo').value.trim() || '미정';
      const messageContent = document.getElementById('messageContent').value.trim();

      if (!clientName || !clientPhone || !messageContent) {
        showToast('필수 입력 사항을 모두 작성해 주세요.', '!');
        return;
      }

      // Format current timestamp (YYYY-MM-DD HH:mm)
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newInquiry = {
        id: 'inq-' + Date.now(),
        clientName,
        clientPhone,
        orgName,
        courseKey,
        courseTitle,
        lectureDate,
        audienceInfo,
        messageContent,
        createdAt: dateStr,
        status: 'pending'
      };

      const originalBtnHtml = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = '<span>의뢰 접수 중입니다...</span>';

      setTimeout(() => {
        // Save to DB
        const currentList = getStoredInquiries();
        currentList.unshift(newInquiry);
        saveInquiries(currentList);

        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnHtml;
        inquiryForm.reset();

        showToast(`${clientName} 님, 강의 의뢰가 안전하게 접수되었습니다! 관리자 시스템에 기록되었습니다.`, '✦');

        // If admin dashboard is currently open, refresh it immediately
        if (adminDashboardModal && adminDashboardModal.classList.contains('active')) {
          renderAdminDashboard();
        }
      }, 700);
    });
  }

  // ==========================================================================
  // 7. Admin Authentication & Session Management
  // ==========================================================================
  const ADMIN_SESSION_KEY = 'daon_admin_logged_in';
  const ADMIN_CREDENTIALS = {
    id: 'admin',
    pw: 'daon2026!'
  };

  const isAdminLoggedIn = () => {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  };

  const setAdminLoggedIn = (status) => {
    if (status) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
  };

  // Modals
  const adminLoginModal = document.getElementById('adminLoginModal');
  const adminDashboardModal = document.getElementById('adminDashboardModal');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminIdInput = document.getElementById('adminId');
  const adminPwInput = document.getElementById('adminPw');
  const loginErrorMsg = document.getElementById('loginErrorMsg');
  const adminLoginCloseBtn = document.getElementById('adminLoginCloseBtn');
  const adminDashboardCloseBtn = document.getElementById('adminDashboardCloseBtn');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');
  const adminLoginTriggerBtn = document.getElementById('adminLoginTriggerBtn');
  const headerAdminTrigger = document.getElementById('headerAdminTrigger');
  const mobileAdminTrigger = document.getElementById('mobileAdminTrigger');

  const openAdminLoginModal = () => {
    if (loginErrorMsg) loginErrorMsg.style.display = 'none';
    if (adminIdInput) adminIdInput.value = '';
    if (adminPwInput) adminPwInput.value = '';
    adminLoginModal.classList.add('active');
    adminLoginModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => adminIdInput && adminIdInput.focus(), 100);
  };

  const closeAdminLoginModal = () => {
    adminLoginModal.classList.remove('active');
    adminLoginModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openAdminDashboard = () => {
    closeAdminLoginModal();
    renderAdminDashboard();
    adminDashboardModal.classList.add('active');
    adminDashboardModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeAdminDashboard = () => {
    adminDashboardModal.classList.remove('active');
    adminDashboardModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Trigger handlers
  const handleAdminTriggerClick = (e) => {
    e.preventDefault();
    if (isAdminLoggedIn()) {
      openAdminDashboard();
    } else {
      openAdminLoginModal();
    }
  };

  if (adminLoginTriggerBtn) adminLoginTriggerBtn.addEventListener('click', handleAdminTriggerClick);
  if (headerAdminTrigger) headerAdminTrigger.addEventListener('click', handleAdminTriggerClick);
  if (mobileAdminTrigger) mobileAdminTrigger.addEventListener('click', handleAdminTriggerClick);
  if (adminLoginCloseBtn) adminLoginCloseBtn.addEventListener('click', closeAdminLoginModal);
  if (adminDashboardCloseBtn) adminDashboardCloseBtn.addEventListener('click', closeAdminDashboard);

  if (adminLoginModal) {
    adminLoginModal.addEventListener('click', (e) => {
      if (e.target === adminLoginModal) closeAdminLoginModal();
    });
  }
  if (adminDashboardModal) {
    adminDashboardModal.addEventListener('click', (e) => {
      if (e.target === adminDashboardModal) closeAdminDashboard();
    });
  }

  // Admin Login Submission
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredId = adminIdInput.value.trim();
      const enteredPw = adminPwInput.value.trim();

      if (enteredId === ADMIN_CREDENTIALS.id && enteredPw === ADMIN_CREDENTIALS.pw) {
        setAdminLoggedIn(true);
        if (loginErrorMsg) loginErrorMsg.style.display = 'none';
        showToast('관리자 계정으로 로그인되었습니다.', '🔒');
        openAdminDashboard();
      } else {
        if (loginErrorMsg) loginErrorMsg.style.display = 'block';
        if (adminPwInput) adminPwInput.value = '';
      }
    });
  }

  // Admin Logout
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      setAdminLoggedIn(false);
      closeAdminDashboard();
      showToast('관리자 계정에서 로그아웃되었습니다.', '✓');
    });
  }

  // ==========================================================================
  // 8. Admin Dashboard Rendering & Operations
  // ==========================================================================
  let currentAdminFilter = 'all'; // 'all', 'pending', 'completed'

  const renderAdminDashboard = () => {
    const inquiries = getStoredInquiries();

    // Counts
    const totalCount = inquiries.length;
    const pendingCount = inquiries.filter(i => i.status === 'pending').length;
    const completedCount = inquiries.filter(i => i.status === 'completed').length;

    // Update Stat Badges
    const statTotalCount = document.getElementById('statTotalCount');
    const statPendingCount = document.getElementById('statPendingCount');
    const statCompletedCount = document.getElementById('statCompletedCount');
    const tabCountAll = document.getElementById('tabCountAll');
    const tabCountPending = document.getElementById('tabCountPending');
    const tabCountCompleted = document.getElementById('tabCountCompleted');

    if (statTotalCount) statTotalCount.textContent = totalCount;
    if (statPendingCount) statPendingCount.textContent = pendingCount;
    if (statCompletedCount) statCompletedCount.textContent = completedCount;
    if (tabCountAll) tabCountAll.textContent = totalCount;
    if (tabCountPending) tabCountPending.textContent = pendingCount;
    if (tabCountCompleted) tabCountCompleted.textContent = completedCount;

    // Filter List
    const filteredInquiries = inquiries.filter(item => {
      if (currentAdminFilter === 'pending') return item.status === 'pending';
      if (currentAdminFilter === 'completed') return item.status === 'completed';
      return true;
    });

    const listContainer = document.getElementById('adminInquiryList');
    if (!listContainer) return;

    if (filteredInquiries.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-inquiry-box">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">📂</div>
          <h4 style="font-size: 1.1rem; color: var(--accent-navy); margin-bottom: 0.3rem;">접수된 신청 내역이 없습니다</h4>
          <p style="font-size: 0.88rem;">새로운 강의 의뢰 신청이 들어오면 실시간으로 이곳에 표시됩니다.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filteredInquiries.map(inq => {
      const isPending = inq.status === 'pending';
      const cleanPhone = (inq.clientPhone || '').replace(/[^0-9]/g, '');

      return `
        <article class="inquiry-card" data-id="${inq.id}">
          <div class="inquiry-card-header">
            <div class="inquiry-client-info">
              <span class="client-name-badge">${escapeHtml(inq.clientName)}</span>
              <span class="client-org-badge">${escapeHtml(inq.orgName || '소속 미기재')}</span>
              <span style="font-size: 0.82rem; color: var(--text-muted);">🕒 ${inq.createdAt}</span>
            </div>
            <div>
              <span class="inquiry-status-badge ${isPending ? 'pending' : 'completed'}">
                ${isPending ? '⏳ 상담 대기중' : '✓ 상담 완료'}
              </span>
            </div>
          </div>

          <div class="inquiry-meta-grid">
            <div>
              <div class="meta-item-label">희망 교육 분야</div>
              <div class="meta-item-value" style="color: var(--accent-terracotta);">${escapeHtml(inq.courseTitle)}</div>
            </div>
            <div>
              <div class="meta-item-label">희망 교육 일정</div>
              <div class="meta-item-value">${escapeHtml(inq.lectureDate || '협의')}</div>
            </div>
            <div>
              <div class="meta-item-label">예상 인원/대상</div>
              <div class="meta-item-value">${escapeHtml(inq.audienceInfo || '미정')}</div>
            </div>
            <div>
              <div class="meta-item-label">연락처</div>
              <div class="meta-item-value">${escapeHtml(inq.clientPhone)}</div>
            </div>
          </div>

          <div class="inquiry-message-box">
            ${escapeHtml(inq.messageContent)}
          </div>

          <div class="inquiry-actions-row">
            <div class="action-contact-buttons">
              <a href="tel:${cleanPhone}" class="btn-action-phone">
                📞 전화걸기 (${escapeHtml(inq.clientPhone)})
              </a>
              <a href="sms:${cleanPhone}" class="btn-action-sms">
                💬 문자 보내기
              </a>
            </div>

            <div class="action-status-buttons">
              <button type="button" class="btn-toggle-status" data-action="toggle-status" data-id="${inq.id}">
                ${isPending ? '✓ [상담완료]로 변경' : '↺ [대기중]으로 되돌리기'}
              </button>
              <button type="button" class="btn-delete-inquiry" data-action="delete" data-id="${inq.id}" title="내역 삭제">
                🗑 삭제
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach actions
    listContainer.querySelectorAll('[data-action="toggle-status"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        toggleInquiryStatus(id);
      });
    });

    listContainer.querySelectorAll('[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteInquiry(id);
      });
    });
  };

  // Toggle Status
  const toggleInquiryStatus = (id) => {
    const list = getStoredInquiries();
    const item = list.find(i => i.id === id);
    if (!item) return;

    item.status = item.status === 'pending' ? 'completed' : 'pending';
    saveInquiries(list);
    renderAdminDashboard();
    showToast(`신청 상태가 '${item.status === 'completed' ? '상담완료' : '상담대기'}'(으)로 변경되었습니다.`, '✦');
  };

  // Delete
  const deleteInquiry = (id) => {
    if (!confirm('이 강의 의뢰 내역을 삭제하시겠습니까? (삭제 후 복구할 수 없습니다)')) return;

    const list = getStoredInquiries();
    const updated = list.filter(i => i.id !== id);
    saveInquiries(updated);
    renderAdminDashboard();
    showToast('의뢰 내역이 삭제되었습니다.', '🗑');
  };

  // Filter Tabs
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentAdminFilter = tab.getAttribute('data-status');
      renderAdminDashboard();
    });
  });

  // CSV Export Utility (Excel-compatible with UTF-8 BOM)
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const inquiries = getStoredInquiries();
      if (inquiries.length === 0) {
        showToast('내보낼 신청 데이터가 없습니다.', '!');
        return;
      }

      const headers = ['접수일시', '상태', '의뢰인성함', '연락처', '소속기관', '희망교육분야', '희망일정', '인원대상', '문의상세내용'];
      const rows = inquiries.map(i => [
        i.createdAt,
        i.status === 'completed' ? '상담완료' : '상담대기',
        i.clientName,
        i.clientPhone,
        i.orgName || '',
        i.courseTitle,
        i.lectureDate || '',
        i.audienceInfo || '',
        (i.messageContent || '').replace(/"/g, '""').replace(/\n/g, ' ')
      ]);

      const csvContent = '\uFEFF' + [
        headers.map(h => `"${h}"`).join(','),
        ...rows.map(r => r.map(field => `"${field}"`).join(','))
      ].join('\r\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', url);
      downloadAnchor.setAttribute('download', `강의의뢰신청목록_김인숙강사_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(url);

      showToast('신청 목록이 엑셀(CSV) 파일로 다운로드되었습니다.', '📥');
    });
  }

  // Helper function to escape HTML special characters
  function escapeHtml(string) {
    if (!string) return '';
    const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return String(string).replace(/[&<>"']/g, s => entityMap[s]);
  }

  // Keyboard Escape listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (curriculumModal && curriculumModal.classList.contains('active')) closeCurriculumModal();
      if (adminLoginModal && adminLoginModal.classList.contains('active')) closeAdminLoginModal();
      if (adminDashboardModal && adminDashboardModal.classList.contains('active')) closeAdminDashboard();
    }
  });
});
