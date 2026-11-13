import { FaLinkedinIn, FaGithub, FaSpotify } from 'react-icons/fa'
import { FiFileText } from 'react-icons/fi'

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tommy-do-9aaa26169/', Icon: FaLinkedinIn },
  { label: 'GitHub', href: 'https://github.com/do-tommy', Icon: FaGithub },
  { label: 'Spotify', href: 'https://open.spotify.com/user/hjvo7uwfnnzw822obtp4db5il', Icon: FaSpotify },
]

const iconLinkClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition duration-150 hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const SocialMediaIcons = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          className={iconLinkClass}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </a>
      ))}
      <a
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 text-sm font-medium text-white backdrop-blur-md transition duration-150 hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        href="/RESUME_TOMMYDO.pdf?v=2026"
        target="_blank"
        rel="noreferrer"
      >
        <FiFileText className="h-4 w-4" aria-hidden />
        Resume
      </a>
    </div>
  )
}

export default SocialMediaIcons
