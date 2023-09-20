
import Link from 'next/link';


const SocialMediaIcons = () => {
    return (
        <div className="flex justify-center md:justify-start my-10 gap-7">
      <a
        className="hover:opacity-50 transition duration-500"
        href="https://www.linkedin.com/in/tommy-do-9aaa26169/"
        target="_blank"
        rel="noreferrer"
      >
        <img alt="linkedin-link" src="https://img.icons8.com/color/48/linkedin.png" />
      </a>
      <a
        className="hover:opacity-50 transition duration-500"
        href="https://github.com/do-tommy"
        target="_blank"
        rel="noreferrer"
      >
        <img alt="twitter-link" src="https://img.icons8.com/color/48/github.png" />
      </a>
      <a
        className="hover:opacity-50 transition duration-500"
        href="https://open.spotify.com/user/hjvo7uwfnnzw822obtp4db5il"
        target="_blank"
        rel="noreferrer"
      >
        <img alt="twitter-link" src="https://img.icons8.com/color/48/spotify--v1.png" />
      </a>
    </div>
      
      
    );
  };
  
  export default SocialMediaIcons;