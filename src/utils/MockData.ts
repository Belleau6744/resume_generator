import { ResumeGroup, UsersType } from "@types";

export const MockUsers: UsersType = {
    'wrBMCbFuRoZw9At4WH78WuIFoUT2': {
        firstName: 'Jeremy',
        lastName: 'Belleau',
        userRole: 'student',
        resumeIDs: ['wrBMCbFuRoZw9At4WH78WuIFoUT2_0', 'wrBMCbFuRoZw9At4WH78WuIFoUT2_1']
    },
    '2oiNJXKBT8PTw3iPKlqqVBea70Q2': {
        userRole: 'reviewer',
        firstName: 'TestName',
        lastName: 'TestLastName'
    }
}

export const MockResumes: ResumeGroup = {
    'wrBMCbFuRoZw9At4WH78WuIFoUT2_0': {
        creationDate: '24-05-2024',
        status: 'new',
        content: {
            generalInfo: {
                "first name": "Jeremy",
                "last name": "Belleau",
                "phone number": "819-123-4567",
                "email address": "",
                languages: {
                    'fra': '3',
                    'eng': '2',
                },
                "role title": "",
                linkedin: ""
            },
            education: {
                '0': {
                    'degree': 'Bachelor of Applied Sciences',
                    'field of study': 'Software Engineering',
                    'school name': 'University of Ottawa',
                    'school address': '75 Laurier Avenue, Ottawa, ON, K1N6N5',
                    'start date': 'September 2020',
                    'end date': ' September 2023',
                },
                '1': {
                    'degree': 'Bachelor of Applied Sciences',
                    'field of study': 'Computer Science',
                    'school name': 'University of Quebec in Outaouais',
                    'school address': '283 Alexandre-Taché Blvd, Gatineau, QC, J8X3X7',
                    'start date': 'September 2023',
                    'end date':'December 2024',
                }
            },
            skills: {
                hasSections: true,
                content: {
                    'Programming Language': [
                        {
                            title: 'Java'
                        },
                        {
                            title: 'C#'
                        },
                        {
                            title: 'C'
                        },
                        {
                            title: 'C++'
                        },
                        {
                            title: 'Python'
                        },
                        {
                            title: 'JavaScript'
                        },
                        {
                            title: 'TypeScript'
                        },
                        {
                            title: 'HTML'
                        },
                        {
                            title: 'CSS'
                        },
                        {
                            title: 'XML'
                        }
                    ],
                    'Libraries & Framework': [
                        {
                            title: 'React'
                        },
                        {
                            title: 'SpringBoot'
                        },
                        {
                            title: '.NET'
                        },
                        {
                            title: 'Node'
                        },
                        {
                            title: 'RxJS'
                        },
                        {
                            title: 'Redux'
                        },
                        {
                            title: 'Jest'
                        },
                    ],
                    'Tools & Plateforms': [
                        {
                            title: 'Git'
                        },
                        {
                            title: 'GitHub'
                        },
                        {
                            title: 'Storybook'
                        },
                        {
                            title: 'Figma'
                        },
                        {
                            title: 'Jira'
                        },
                        {
                            title: 'Android Studio'
                        },
                        {
                            title: 'XCode'
                        },
                        {
                            title: 'Eclipse'
                        },
                        {
                            title: 'VSCode'
                        },
                        {
                            title: 'Docker'
                        },
                        {
                            title: 'Firebase'
                        },
                        {
                            title: 'Linux'
                        },
                        {
                            title: 'Jenkins'
                        },
                    ],
                    'Internet Protocols': [
                        {
                            title: 'MSRP'
                        },
                        {
                            title: 'TCP'
                        },
                        {
                            title: 'SIP'
                        },
                        {
                            title: 'SDP'
                        },
                        {
                            title: 'UDP'
                        },
                        {
                            title: 'HTTP'
                        },
                        {
                            title: 'DNS'
                        },
                        {
                            title: 'IP'
                        },
                        {
                            title: 'REST'
                        },
                    ]
                }
            },
            experience: {
                workingExperience: {
                    '0': {
                        organizationName: 'Ross Video',
                        jobTitle: 'Frontend Software Engineer Co-op',
                        taskDescription: [
                            'Participated in the development of a robust React Typescript framework to standardize front-end application development for internal team, ensuring consistency across the organization',
                            'Utilized technologies such Node, ESLint, redux, RxJS, Jest to construct the framework to construct the framework, promoting efficiency and maintainability of the codebase',
                            'Implemented effective project and task management using Jira, ensuring seamless coordination and progress tracking throughout the development lifecycle.',
                            'Collaborated with multidisciplinary teams implementing our product, demonstrating strong communication and teamwork skills to achieve project goals in an Agile environment.',
                            'Contributed to improving internal development processes and practices, enhancing overall productivity and code quality within the organization'
                        ],
                        startDate: 'September 2022',
                        stillWorking: false,
                        endDate: 'September 2023'
                    },
                    '1': {
                        organizationName: 'Motorola Solution',
                        jobTitle: 'Software Engineer Co-op',
                        taskDescription: [
                            'Developed a Java Spring boot application utilizing cloud deployment, enabling TCP connections and communication based on the MSRP protocol',
                            'Created a library for TCP connections, optimizing socket reuse and enhancing application performance',
                            'Actively collaborated within an agile Scrum Team, utilizing Azure DevOps for streamlined project management and efficient delivery',
                            'Designed and implemented a deployment pipeline and Docker Compose configuration, ensuring a reliable and automated deployment process on a virtual machine using Azure Services',
                            'Integrated the application seamlessly with a Kafka event streaming service, enhancing real-time data processing and application responsiveness',
                        ],
                        startDate: 'January 2022',
                        stillWorking: false,
                        endDate: 'May 2022',
                    },
                    '2': {
                        organizationName: 'Transport Canada',
                        jobTitle: 'Software Engineer Co-op',
                        taskDescription: [
                            'Implemented and debugged front-end and back-end developments in the .Net framework using C# and CSHTML for the drone registration portal used by any individual who wants to own a drone.',
                            'Demonstrated proficiency in bug identification and resolution by effectively using SQL Developer and Visual Studio, ensuring a seamless user experience.',
                            'Performed regression testing after new developments and bugs resolution to ensure project stability before merges and releases.',
                            'Participated in the product development, reviews, and releases through sprints schedules as part of a Scrum team.',
                            'Learned uses of REST APIs through .net integrated services and existing systems for drone management and payment execution',
                            'Documented difficulties faced and new functionalities in the shared documentation on confluence.',
                        ],
                        startDate: 'May 2021',
                        stillWorking: false,
                        endDate: 'Septembre 2021'
                    }
                },
                projectExperience: {
                    '0': {
                        title: 'School Projects',
                        description: 'Developed projects using Java and React for Web and Android, implementing front end and firebase backend'
                    },
                    '1': {
                        title: 'Algorithm',
                        description: 'Resolving algorithm and data structure problems with Java and Python'
                    },
                    '2': {
                        title: 'Embedded',
                        description: 'Creating embedded systems with C/C++'
                    },
                },
                volunteerExperience: {}
            },
        }
    },
    'wrBMCbFuRoZw9At4WH78WuIFoUT2_1': {
        creationDate: '24-05-2024',
        status: 'approved',
        content: {
            generalInfo: {
                "first name": "Jeremy",
                "last name": "Belleau",
                "phone number": "819-123-4567",
                "email address": "",
                languages: {
                    'fra': '2',
                    'eng': '3',
                },
                "role title": "",
                linkedin: ""
            },
            education: {
                '0': {
                    'degree': 'Bachelor of Applied Sciences',
                    'field of study': 'Software Engineering',
                    'school name': 'University of Ottawa',
                    'school address': '75 Laurier Avenue, Ottawa, ON, K1N6N5',
                    'start date': 'September 2020',
                    'end date': ' September 2023',
                },
                '1': {
                    'degree': 'Bachelor of Applied Sciences',
                    'field of study': 'Computer Science',
                    'school name': 'University of Quebec in Outaouais',
                    'school address': '283 Alexandre-Taché Blvd, Gatineau, QC, J8X3X7',
                    'start date': 'September 2023',
                    'end date':'December 2024',
                }
            },
            skills: {
                hasSections: true,
                content: {
                    'Programming Language': [
                        {
                            title: 'Java'
                        },
                        {
                            title: 'C#'
                        },
                        {
                            title: 'C'
                        },
                        {
                            title: 'C++'
                        },
                        {
                            title: 'Python'
                        },
                        {
                            title: 'JavaScript'
                        },
                        {
                            title: 'TypeScript'
                        },
                        {
                            title: 'HTML'
                        },
                        {
                            title: 'CSS'
                        },
                        {
                            title: 'XML'
                        }
                    ],
                    'Libraries & Framework': [
                        {
                            title: 'React'
                        },
                        {
                            title: 'SpringBoot'
                        },
                        {
                            title: '.NET'
                        },
                        {
                            title: 'Node'
                        },
                        {
                            title: 'RxJS'
                        },
                        {
                            title: 'Redux'
                        },
                        {
                            title: 'Jest'
                        },
                    ],
                    'Tools & Plateforms': [
                        {
                            title: 'Git'
                        },
                        {
                            title: 'GitHub'
                        },
                        {
                            title: 'Storybook'
                        },
                        {
                            title: 'Figma'
                        },
                        {
                            title: 'Jira'
                        },
                        {
                            title: 'Android Studio'
                        },
                        {
                            title: 'XCode'
                        },
                        {
                            title: 'Eclipse'
                        },
                        {
                            title: 'VSCode'
                        },
                        {
                            title: 'Docker'
                        },
                        {
                            title: 'Firebase'
                        },
                        {
                            title: 'Linux'
                        },
                        {
                            title: 'Jenkins'
                        },
                    ],
                    'Internet Protocols': [
                        {
                            title: 'MSRP'
                        },
                        {
                            title: 'TCP'
                        },
                        {
                            title: 'SIP'
                        },
                        {
                            title: 'SDP'
                        },
                        {
                            title: 'UDP'
                        },
                        {
                            title: 'HTTP'
                        },
                        {
                            title: 'DNS'
                        },
                        {
                            title: 'IP'
                        },
                        {
                            title: 'REST'
                        },
                    ]
                }
            },
            experience: {
                workingExperience: {
                    '0': {
                        organizationName: 'Ross Video',
                        jobTitle: 'Frontend Software Engineer Co-op',
                        taskDescription: [
                            'Participated in the development of a robust React Typescript framework to standardize front-end application development for internal team, ensuring consistency across the organization',
                            'Utilized technologies such Node, ESLint, redux, RxJS, Jest to construct the framework to construct the framework, promoting efficiency and maintainability of the codebase',
                            'Implemented effective project and task management using Jira, ensuring seamless coordination and progress tracking throughout the development lifecycle.',
                            'Collaborated with multidisciplinary teams implementing our product, demonstrating strong communication and teamwork skills to achieve project goals in an Agile environment.',
                            'Contributed to improving internal development processes and practices, enhancing overall productivity and code quality within the organization'
                        ],
                        startDate: 'September 2022',
                        stillWorking: false,
                        endDate: 'September 2023'
                    },
                    '1': {
                        organizationName: 'Motorola Solution',
                        jobTitle: 'Software Engineer Co-op',
                        taskDescription: [
                            'Developed a Java Spring boot application utilizing cloud deployment, enabling TCP connections and communication based on the MSRP protocol',
                            'Created a library for TCP connections, optimizing socket reuse and enhancing application performance',
                            'Actively collaborated within an agile Scrum Team, utilizing Azure DevOps for streamlined project management and efficient delivery',
                            'Designed and implemented a deployment pipeline and Docker Compose configuration, ensuring a reliable and automated deployment process on a virtual machine using Azure Services',
                            'Integrated the application seamlessly with a Kafka event streaming service, enhancing real-time data processing and application responsiveness',
                        ],
                        startDate: 'January 2022',
                        stillWorking: false,
                        endDate: 'May 2022',
                    },
                    '2': {
                        organizationName: 'Transport Canada',
                        jobTitle: 'Software Engineer Co-op',
                        taskDescription: [
                            'Implemented and debugged front-end and back-end developments in the .Net framework using C# and CSHTML for the drone registration portal used by any individual who wants to own a drone.',
                            'Demonstrated proficiency in bug identification and resolution by effectively using SQL Developer and Visual Studio, ensuring a seamless user experience.',
                            'Performed regression testing after new developments and bugs resolution to ensure project stability before merges and releases.',
                            'Participated in the product development, reviews, and releases through sprints schedules as part of a Scrum team.',
                            'Learned uses of REST APIs through .net integrated services and existing systems for drone management and payment execution',
                            'Documented difficulties faced and new functionalities in the shared documentation on confluence.',
                        ],
                        startDate: 'May 2021',
                        stillWorking: false,
                        endDate: 'Septembre 2021'
                    }
                },
                projectExperience: {
                    '0': {
                        title: 'School Projects',
                        description: 'Developed projects using Java and React for Web and Android, implementing front end and firebase backend'
                    },
                    '1': { 
                        title: 'School Projects',
                        description: 'Resolving algorithm and data structure problems with Java and Python'
                    },
                    '2': {
                        title: 'School Projects',
                        description: 'Creating embedded systems with C/C++'
                    },
                },
                volunteerExperience: {}
            },
        }
    }

}

export const MockDBContent = {
    'users': MockUsers,
    'resumes': MockResumes
}