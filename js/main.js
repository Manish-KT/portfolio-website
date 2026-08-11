document.getElementById('year').textContent = new Date().getFullYear()

const themeToggle = document.getElementById('themeToggle')
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
})

const roles = ['AI Engineer', 'LLM Engineer', 'Agentic Systems Builder', 'GenAI Developer']
const typedEl = document.getElementById('typedRole')

function typeLoop() {
  let roleIndex = 0
  let charIndex = 0
  let deleting = false

  function tick() {
    const current = roles[roleIndex]

    if (!deleting) {
      charIndex++
      typedEl.textContent = current.slice(0, charIndex)
      if (charIndex === current.length) {
        deleting = true
        setTimeout(tick, 1400)
        return
      }
    } else {
      charIndex--
      typedEl.textContent = current.slice(0, charIndex)
      if (charIndex === 0) {
        deleting = false
        roleIndex = (roleIndex + 1) % roles.length
      }
    }

    setTimeout(tick, deleting ? 45 : 75)
  }

  tick()
}

if (typedEl) typeLoop()

const navbar = document.getElementById('navbar')
const scrollProgress = document.getElementById('scrollProgress')
const gridBg = document.querySelector('.grid-bg')

let ticking = false
function onScroll() {
  const scrollY = window.scrollY
  navbar.classList.toggle('navbar--scrolled', scrollY > 12)

  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const progress = scrollable > 0 ? (scrollY / scrollable) * 100 : 0
  scrollProgress.style.width = `${progress}%`

  gridBg.style.transform = `translate3d(0, ${scrollY * 0.05}px, 0)`

  ticking = false
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(onScroll)
    ticking = true
  }
})
onScroll()

const navToggle = document.getElementById('navToggle')
navToggle.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('nav-open')
  navToggle.setAttribute('aria-expanded', String(isOpen))
})

document.querySelectorAll('.navbar__links a').forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('nav-open')
    navToggle.setAttribute('aria-expanded', 'false')
  })
})

const sections = document.querySelectorAll('main section[id]')
const navLinks = document.querySelectorAll('[data-nav]')

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
        })
      }
    })
  },
  { rootMargin: '-40% 0px -50% 0px' }
)

sections.forEach((section) => spyObserver.observe(section))

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
)

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))
