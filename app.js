/**
 * Noor Platform - app.js
 * Object-Oriented JS implementation for the UI and Mock Data
 */

class MockData {
  constructor() {
    this.categories = [
      {
        id: 1,
        title: "التفسير وعلوم القرآن",
        icon: "fa-book-open",
        desc: "دراسات وأبحاث في تفسير كتاب الله وعلومه.",
      },
      {
        id: 2,
        title: "السنة النبوية",
        icon: "fa-mosque",
        desc: "شروحات الأحاديث ودراسات في السيرة العطرة.",
      },
      {
        id: 3,
        title: "دراسات معاصرة",
        icon: "fa-lightbulb",
        desc: "إشكالات علمية حديثة ورؤى نقدية معاصرة.",
      },
      {
        id: 4,
        title: "تطبيقات قرآنية",
        icon: "fa-mobile-screen",
        desc: "تطبيقات برمجية وإلكترونية لخدمة الوحيين.",
      },
    ];

    this.articles = [
      {
        id: 1,
        title: "تأملات في مقاصد سورة النور وأثرها في الفرد والمجتمع",
        excerpt:
          "بحث يستعرض أهم المقاصد التربوية والاجتماعية التي تضمنتها سورة النور وكيفية تطبيقها في العصر الحديث.",
        category: "تفسير",
        type: "tafsir",
        date: "15 مارس 2026",
        img: "https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-one-quran-open-on-a-wooden-table-image_2569749.jpg",
      },
      {
        id: 2,
        title: "المنهج النقدي في دراسة الاستشراق المعاصر",
        excerpt:
          "قراءة في أحدث الدراسات الغربية حول القرآن الكريم مع عرض ونقد منهجي لأبرز الشبهات.",
        category: "دراسات معاصرة",
        type: "studies",
        date: "12 مارس 2026",
        img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: 3,
        title: "أحكام التجويد: بين الرواية المأثورة والدراسة الصوتية",
        excerpt:
          "مقال يناقش العلاقة بين علم التجويد الموروث وعلم الأصوات اللغوي الحديث.",
        category: "علوم القرآن",
        type: "tafsir",
        date: "08 مارس 2026",
        img: "https://surahquran.com/Tajweed/Pictures/tajweed.png",
      },
      {
        id: 4,
        title: "أثر التكنولوجيا في تعليم القرآن الكريم للصغار",
        excerpt:
          "استعراض لأحدث التطبيقات والأساليب التقنية في تحفيظ وتعليم القرآن الكريم.",
        category: "تطبيقات قرآنية",
        type: "studies",
        date: "05 مارس 2026",
        img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: 5,
        title: "مقاصد الشريعة في المعاملات المالية المعاصرة",
        excerpt:
          "دراسة فقهية مقاصدية للتعاملات المالية الحديثة والعملات الرقمية.",
        category: "فقه وأصول",
        type: "studies",
        date: "01 مارس 2026",
        img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      },
    ];
  }

  getCategories() {
    return this.categories;
  }

  getArticles() {
    return this.articles;
  }
}

class UIController {
  constructor() {
    // DOM Elements
    this.header = document.getElementById("header");
    this.mobileToggle = document.getElementById("mobile-toggle");
    this.navMenu = document.getElementById("nav-menu");
    this.overlay = document.getElementById("overlay");

    this.searchToggle = document.getElementById("search-toggle");
    this.searchBar = document.getElementById("search-bar");

    this.langToggle = document.getElementById("lang-toggle");
    this.langMenu = document.getElementById("lang-menu");
    this.currentLangText = document.getElementById("current-lang");
    this.langDropdown = document.querySelector(".language-switcher");

    this.categoriesContainer = document.getElementById("categories-container");
    this.articlesContainer = document.getElementById("articles-container");
    this.filterBtns = document.querySelectorAll(".filter-btn");

    this.newsletterForm = document.getElementById("newsletter-form");
  }

  init() {
    this.setupEventListeners();
    this.handleScroll(); // Initial check for sticky header & reveals
  }

  setupEventListeners() {
    // Mobile Menu
    this.mobileToggle.addEventListener("click", () => this.toggleMobileMenu());
    this.overlay.addEventListener("click", () => this.closeAllModals());

    // Search Toggle
    this.searchToggle.addEventListener("click", () => this.toggleSearch());

    // Language Dropdown
    this.langToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.langDropdown.classList.toggle("active");
    });

    // Close dropdowns on outside click
    document.addEventListener("click", (e) => {
      if (!this.langDropdown.contains(e.target)) {
        this.langDropdown.classList.remove("active");
      }
    });

    // Language Selection (Mock)
    const langLinks = this.langMenu.querySelectorAll("a");
    langLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = e.target.getAttribute("data-lang");
        const text = e.target.innerText;
        this.changeLanguage(lang, text);
      });
    });

    // Scroll Events
    window.addEventListener("scroll", () => this.handleScroll());

    // Setup Newsletter Mock
    if (this.newsletterForm) {
      this.newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("شكرًا لاشتراكك في النشرة البريدية!");
        this.newsletterForm.reset();
      });
    }
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle("active");
    this.overlay.classList.toggle("active");
    const icon = this.mobileToggle.querySelector("i");
    if (this.navMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  closeAllModals() {
    this.navMenu.classList.remove("active");
    this.overlay.classList.remove("active");
    this.searchBar.classList.remove("active");
    const icon = this.mobileToggle.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }

  toggleSearch() {
    this.searchBar.classList.toggle("active");
    if (this.searchBar.classList.contains("active")) {
      setTimeout(() => document.getElementById("search-input").focus(), 100);
    }
  }

  changeLanguage(langCode, langText) {
    this.currentLangText.innerText = langText;
    this.langDropdown.classList.remove("active");
    // In a real app, this would trigger translation logic or redirection
    console.log(`Language changed to: ${langCode}`);

    // Mocking LTR for English/Urdu just to show dynamic behavior
    if (langCode === "en") {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
    } else {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", langCode);
    }
  }

  handleScroll() {
    // Sticky Header
    if (window.scrollY > 50) {
      this.header.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    } else {
      this.header.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
    }

    // Reveal Animations
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 50; // trigger sooner

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
  }

  renderCategories(categories) {
    if (!this.categoriesContainer) return;
    this.categoriesContainer.innerHTML = "";

    categories.forEach((cat, index) => {
      const delay = index * 100;
      const html = `
                <div class="category-card reveal" style="transition-delay: ${delay}ms">
                    <div class="category-icon">
                        <i class="fa-solid ${cat.icon}"></i>
                    </div>
                    <h3 class="category-title">${cat.title}</h3>
                    <p class="category-desc">${cat.desc}</p>
                </div>
            `;
      this.categoriesContainer.insertAdjacentHTML("beforeend", html);
    });
  }

  renderArticles(articles) {
    if (!this.articlesContainer) return;
    this.articlesContainer.innerHTML = "";

    articles.forEach((article, index) => {
      const delay = index * 100;
      const html = `
                <div class="article-card reveal" data-type="${article.type}" style="transition-delay: ${delay}ms">
                    <div class="article-img">
                        <span class="article-category">${article.category}</span>
                        <img src="${article.img}" alt="${article.title}">
                    </div>
                    <div class="article-content">
                        <h3 class="article-title"><a href="#">${article.title}</a></h3>
                        <p class="article-excerpt">${article.excerpt}</p>
                        <div class="article-meta">
                            <span class="date"><i class="fa-regular fa-calendar"></i> ${article.date}</span>
                            <a href="#" class="btn btn-text">اقرأ المزيد</a>
                        </div>
                    </div>
                </div>
            `;
      this.articlesContainer.insertAdjacentHTML("beforeend", html);
    });

    // Setup filter logic after rendering
    this.setupFilters();
  }

  setupFilters() {
    this.filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Update active class
        this.filterBtns.forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");

        // Filter logic
        const filterValue = e.target.getAttribute("data-filter");
        const allArticles = document.querySelectorAll(".article-card");

        allArticles.forEach((card) => {
          if (
            filterValue === "all" ||
            card.getAttribute("data-type") === filterValue
          ) {
            card.style.display = "flex";
            setTimeout(() => (card.style.opacity = "1"), 50);
          } else {
            card.style.opacity = "0";
            setTimeout(() => (card.style.display = "none"), 300);
          }
        });
      });
    });
  }
}

class App {
  constructor() {
    this.data = new MockData();
    this.ui = new UIController();
  }

  init() {
    console.log("Noor Platform App Initialized.");
    this.ui.init();

    // Render dynamic content
    this.ui.renderCategories(this.data.getCategories());
    this.ui.renderArticles(this.data.getArticles());

    // Trigger manual scroll to fire reveals on initial load
    setTimeout(() => this.ui.handleScroll(), 100);
  }
}

// Bootstrapping the application
document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});
