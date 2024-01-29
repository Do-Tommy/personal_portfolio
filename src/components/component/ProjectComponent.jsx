
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card, CardImage } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import Image from "next/image";

const ProjectComponent = ({project})  => {
  return (
    (<section className="w-full">
      <div
        className="container grid justify-center text-center lg:text-left xl:max-w-6xl ">
       
        <div className="my-8">
          <Card className='bg-primary transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 '>
            <CardHeader className="flex flex-row items-center gap-4">
              <FrameIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle className="text-text">{project.name}</CardTitle>
                <CardDescription className="text-text">{project.description}</CardDescription>    
              </div>
            </CardHeader>
            <div className="w-[100%] sm:max-w-md max-h-[30vh] overflow-hidden ">
              <CardImage q
                  src={project.image}
                  title="green iguana"  
                />
                </div>
            <CardContent className="grid gap-2">
            </CardContent>
            <CardFooter className="bg-primary py-4 dark:bg-background">
              <a target="_blank" href={project.github}>
              <Button size="sm" className='bg-accent '>View Github</Button>
              </a>
              <a target="_blank" href={project.site}>
              <Button size="sm" className='bg-accent mx-4'>View Site</Button>
              </a>
            </CardFooter>
          </Card>
          
        </div>
      </div>
    </section>)
  );
}


function FrameIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>)
  );
}


function GithubIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M15 22v-4a4.8 4.8 0 0-1-3.5c3 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2c-.3 1.15-.3 2.35 3.5A5.403 5.403 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>)
  );
}


function GitBranchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 1-9" />
    </svg>)
  );
}


function BookOpenIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 1 4v14a3 3 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0-4 4v14a3 3 1 3-3h7z" />
    </svg>)
  );
}


function LayoutPanelLeftIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="7" height="18" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
    </svg>)
  );
}

export default ProjectComponent