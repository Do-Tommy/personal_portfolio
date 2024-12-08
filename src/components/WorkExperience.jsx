import React from 'react';
import { Reveal } from '@/hooks/reveal';

const WorkExperience = () => {
    const experiences = [
        {
            title: "Software Engineer",
            company: "Company Name",
            period: "June 2023 - Present",
            description: [
                "Led development of key features resulting in 30% improvement in user engagement",
                "Collaborated with cross-functional teams to implement new technologies",
                "Optimized application performance reducing load time by 40%"
            ]
        },
        {
            title: "Software Engineering Intern",
            company: "Company Name",
            period: "May 2022 - August 2022",
            description: [
                "Developed and maintained full-stack applications using React and Node.js",
                "Implemented responsive design principles ensuring mobile-first approach",
                "Participated in code reviews and contributed to team documentation"
            ]
        }
    ];

    return (
        <div className="w-full py-16 px-4" id="experience">
            <div className="max-w-[1240px] mx-auto md:ml-8">
                <Reveal>
                    <h2 className="text-4xl font-bold text-center md:text-left mb-8 text-text">
                        Work Experience
                        <div className='animate-sideways h-[10px] mt-2 bg-secondary border-2 border-secondary'></div>
                    </h2>
                </Reveal>
                
                <div className="grid gap-8 max-w-[90%] mx-auto md:max-w-full">
                    {experiences.map((exp, index) => (
                        <Reveal key={index}>
                            <div className="bg-[#1F2937] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary">{exp.title}</h3>
                                        <p className="text-text">{exp.company}</p>
                                    </div>
                                    <p className="text-accent mt-2 md:mt-0">{exp.period}</p>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-text">
                                    {exp.description.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkExperience; 