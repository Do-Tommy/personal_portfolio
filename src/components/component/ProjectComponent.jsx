
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card, CardImage } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import Image from "next/image";

const ProjectComponent = ()  => {
  return (
    (<section className="w-full py-12 md:py-24 lg:py-32">
      <div
        className="container grid max-w-5xl justify-center gap-3 px-4 text-center md:gap-7 md:px-3 lg:grid-cols-2 lg:text-left xl:max-w-6xl xl:gap-9">
        <div className="space-y-4">
          <div className="space-y-3">
            <h1 className="text-6xl font-bold tracking-tighter text-text">My Projects</h1>
            <p
              className="mx-auto max-w-[700px] text-text md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-text">
              A collection of my recent projects.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
          <Card className='bg-primary  '>
            <CardHeader className="flex flex-row items-center gap-4">
              <FrameIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle className="text-text">Personal Website</CardTitle>
                <CardDescription className="text-text">A personal porfolio website built with Reactjs</CardDescription>
                
              </div>
            </CardHeader>
            <div className="w-[max] h-[30vh] overflow-hidden ">
              <CardImage
                  src='/slide1.png'
                  title="green iguana"
                  
                />
                </div>
            <CardContent className="grid gap-2">
            </CardContent>
            <CardFooter className="bg-primary py-4 dark:bg-background">
              <Button size="sm" className='bg-accent'>View Details</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <BookOpenIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle className="text-text">Project 2</CardTitle>
                <CardDescription className="text-text" >A brief description of the project.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="text-sm font-semibold">docs: add docs for memberships</div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <GithubIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">1 day ago</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitBranchIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">main</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-100 py-4 dark:bg-gray-800">
              <Button size="sm">View Details</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <LayoutPanelLeftIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Project 3</CardTitle>
                <CardDescription>A brief description of the .</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2">
             
                  <GithubIcon className="w-4 h-4" />
                  
                
                <div className="flex items-center gap-1">
                  <GitBranchIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">main</span>
                </div>
              
            </CardContent>
            <CardFooter className="bg-gray-100 py-4 dark:bg-gray-800">
              <Button size="sm">View Details</Button>
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