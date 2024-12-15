const mongoose = require('mongoose');
const Course = require('./models/Course');

mongoose.connect('mongodb+srv://bruhmomentvseter:USJEYVfGbxxhJU0p@cluster0.0tlwa.mongodb.net/EDUCATE_DB?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err);
    });

const courses = [
    { title: 'JavaScript Basics', description: 'Learn the fundamentals of JavaScript', category: 'Programming', level: 'Beginner', image: '/assets/js-logo.png' },
    { title: 'Python for Data Science', description: 'Explore data analysis with Python', category: 'Data Science', level: 'Intermediate', image: '/assets/python-logo.png' },
    { title: 'Introduction to HTML', description: 'Learn to create basic web pages', category: 'Web Development', level: 'Beginner', image: '/assets/html-logo.png' },
    { title: 'CSS Styling', description: 'Master the art of web design with CSS', category: 'Web Development', level: 'Intermediate', image: '/assets/css-logo.png' },
    { title: 'React Basics', description: 'Build dynamic web apps with React', category: 'Programming', level: 'Intermediate', image: '/assets/react-logo.png' },
    { title: 'Node.js Essentials', description: 'Learn backend development with Node.js', category: 'Programming', level: 'Intermediate', image: '/assets/nodejs-logo.png' },
    { title: 'Data Structures', description: 'Master essential data structures', category: 'Programming', level: 'Advanced', image: '/assets/data-structures.png' },
    { title: 'Machine Learning with Python', description: 'Dive into machine learning techniques', category: 'Data Science', level: 'Advanced', image: '/assets/ml-python.png' },
    { title: 'Cloud Computing Basics', description: 'Understand the basics of cloud computing', category: 'IT', level: 'Beginner', image: '/assets/cloud-computing.png' },
    { title: 'Linux Fundamentals', description: 'Get started with Linux systems', category: 'IT', level: 'Beginner', image: '/assets/linux-logo.png' },
    { title: 'Java Programming', description: 'Learn Java from scratch', category: 'Programming', level: 'Beginner', image: '/assets/java-logo.png' },
    { title: 'C++ for Beginners', description: 'Introduction to C++ programming', category: 'Programming', level: 'Beginner', image: '/assets/cpp-logo.png' },
    { title: 'Cybersecurity Basics', description: 'Learn to protect systems and data', category: 'IT', level: 'Beginner', image: '/assets/cybersecurity.png' },
    { title: 'Android App Development', description: 'Build your first Android app', category: 'Mobile Development', level: 'Intermediate', image: '/assets/android-logo.png' },
    { title: 'iOS App Development', description: 'Start developing iOS apps', category: 'Mobile Development', level: 'Intermediate', image: '/assets/ios-logo.png' },
    { title: 'SQL for Data Analysis', description: 'Analyze data with SQL', category: 'Data Science', level: 'Beginner', image: '/assets/sql-logo.png' },
    { title: 'Artificial Intelligence', description: 'Explore AI techniques and applications', category: 'Data Science', level: 'Advanced', image: '/assets/ai-logo.png' },
    { title: 'Blockchain Fundamentals', description: 'Learn blockchain technology basics', category: 'IT', level: 'Beginner', image: '/assets/blockchain-logo.png' },
    { title: 'Game Development with Unity', description: 'Create games using Unity', category: 'Game Development', level: 'Intermediate', image: '/assets/unity-logo.png' },
    { title: 'Photoshop Essentials', description: 'Master Photoshop tools', category: 'Design', level: 'Beginner', image: '/assets/photoshop-logo.png' },
    { title: 'Digital Marketing', description: 'Learn online marketing strategies', category: 'Marketing', level: 'Beginner', image: '/assets/digital-marketing.png' },
    { title: 'SEO Techniques', description: 'Optimize websites for search engines', category: 'Marketing', level: 'Intermediate', image: '/assets/seo-logo.png' },
    { title: 'Docker for DevOps', description: 'Learn containerization with Docker', category: 'IT', level: 'Intermediate', image: '/assets/docker-logo.png' },
    { title: 'Kubernetes Basics', description: 'Manage containers with Kubernetes', category: 'IT', level: 'Advanced', image: '/assets/kubernetes-logo.png' },
    { title: 'Rust Programming', description: 'Explore the Rust programming language', category: 'Programming', level: 'Intermediate', image: '/assets/rust-logo.png' },
    { title: 'Flutter for Mobile Apps', description: 'Build apps with Flutter', category: 'Mobile Development', level: 'Intermediate', image: '/assets/flutter-logo.png' },
    { title: 'Photography Basics', description: 'Learn photography essentials', category: 'Design', level: 'Beginner', image: '/assets/photography.png' },
    { title: 'Video Editing', description: 'Edit videos professionally', category: 'Design', level: 'Intermediate', image: '/assets/video-editing.png' },
    { title: 'Project Management', description: 'Master project management techniques', category: 'Business', level: 'Intermediate', image: '/assets/project-management.png' },
    { title: 'Public Speaking', description: 'Develop effective public speaking skills', category: 'Communication', level: 'Beginner', image: '/assets/public-speaking.png' },
    { title: 'Microsoft Excel', description: 'Learn advanced Excel techniques', category: 'Business', level: 'Intermediate', image: '/assets/excel-logo.png' },
    { title: 'Figma for UI/UX', description: 'Design interfaces using Figma', category: 'Design', level: 'Intermediate', image: '/assets/figma-logo.png' },

    
    { title: 'Advanced JavaScript Concepts', description: 'Deepen your understanding of JavaScript by exploring advanced topics such as closures, promises, async/await, and more. Learn how to work with modern JavaScript tools and libraries to build scalable applications.', category: 'Programming', level: 'Advanced', image: '/assets/js-logo.png' },
    { title: 'Data Science with Python', description: 'Learn to analyze complex datasets using Python. This course covers machine learning algorithms, data wrangling, and visualization techniques using libraries like Pandas, NumPy, and Matplotlib.', category: 'Data Science', level: 'Intermediate', image: '/assets/python-logo.png' },
    { title: 'Web Design with HTML & CSS', description: 'Learn how to create visually appealing web pages using HTML and CSS. Understand page structure, design best practices, and how to implement responsive layouts for mobile and desktop views.', category: 'Web Development', level: 'Beginner', image: '/assets/html-logo.png' },
    { title: 'Advanced CSS Styling and Animations', description: 'Take your CSS skills to the next level by mastering animations, transitions, and flexbox layouts. Learn how to create responsive, interactive designs that look great on any device.', category: 'Web Development', level: 'Intermediate', image: '/assets/css-logo.png' },
    { title: 'React for Interactive Web Applications', description: 'Learn how to build dynamic web apps with React. Explore component-based architecture, state management, and hooks to create interactive user interfaces for complex applications.', category: 'Programming', level: 'Intermediate', image: '/assets/react-logo.png' },
    { title: 'Backend Development with Node.js', description: 'Learn the essentials of backend development using Node.js and Express. This course covers building RESTful APIs, integrating databases, and managing server-side logic for web applications.', category: 'Programming', level: 'Advanced', image: '/assets/nodejs-logo.png' },
    { title: 'Mastering Data Structures in C++', description: 'Understand essential data structures like arrays, stacks, queues, and trees, and how to implement them using C++. Learn algorithmic techniques to optimize code performance.', category: 'Programming', level: 'Advanced', image: '/assets/data-structures.png' },
    { title: 'Introduction to Machine Learning with Python', description: 'Explore the fundamentals of machine learning using Python. Learn how to implement algorithms like linear regression and classification, and understand how to train and evaluate models.', category: 'Data Science', level: 'Beginner', image: '/assets/ml-python.png' },
    { title: 'Cloud Infrastructure Management', description: 'Understand how cloud platforms like AWS and Azure work. Learn to deploy applications, manage resources, and scale infrastructure in cloud environments.', category: 'IT', level: 'Intermediate', image: '/assets/cloud-computing.png' },
    { title: 'Linux System Administration', description: 'Learn Linux commands, shell scripting, and system administration tasks. Understand file management, user permissions, and how to set up and maintain Linux servers.', category: 'IT', level: 'Advanced', image: '/assets/linux-logo.png' },
    { title: 'Object-Oriented Programming with Java', description: 'Master object-oriented programming concepts using Java. Learn about classes, inheritance, polymorphism, and interfaces to build scalable, reusable code.', category: 'Programming', level: 'Intermediate', image: '/assets/java-logo.png' },
    { title: 'C++ for Intermediate Developers', description: 'Take your C++ skills to the next level by exploring pointers, dynamic memory, and advanced data structures. This course is perfect for those with basic knowledge of C++ looking to deepen their skills.', category: 'Programming', level: 'Intermediate', image: '/assets/cpp-logo.png' },
    { title: 'Introduction to Cybersecurity', description: 'Learn the basics of cybersecurity, including encryption, threat detection, and risk management. Understand how to protect systems and sensitive data from online attacks.', category: 'IT', level: 'Beginner', image: '/assets/cybersecurity.png' },
    { title: 'Advanced Android Development', description: 'Take your Android app development skills to the next level. Learn to implement advanced features such as in-app purchases, push notifications, and Firebase integration for cloud services.', category: 'Mobile Development', level: 'Advanced', image: '/assets/android-logo.png' },
    { title: 'iOS App Development with Swift', description: 'Build robust iOS apps with Swift. Learn to create custom UIs, integrate with APIs, and utilize Swift frameworks for app development across Apple devices.', category: 'Mobile Development', level: 'Intermediate', image: '/assets/ios-logo.png' },
    { title: 'SQL for Data Science and Analytics', description: 'Learn how to query and manipulate data using SQL. This course will cover complex queries, database management, and data analytics techniques to extract actionable insights.', category: 'Data Science', level: 'Intermediate', image: '/assets/sql-logo.png' },
    { title: 'Artificial Intelligence with Python', description: 'Master AI techniques using Python. Learn about neural networks, deep learning, and natural language processing to build intelligent applications and solve real-world problems.', category: 'Data Science', level: 'Advanced', image: '/assets/ai-logo.png' },
    { title: 'Blockchain and Cryptocurrency Basics', description: 'Understand the fundamentals of blockchain technology and cryptocurrency. Learn how distributed ledgers work, and explore use cases like smart contracts and digital currencies.', category: 'IT', level: 'Beginner', image: '/assets/blockchain-logo.png' },
    { title: 'Unity for Game Development', description: 'Learn how to create 2D and 3D games using Unity. Explore game physics, animations, and real-time rendering to develop interactive gaming experiences across multiple platforms.', category: 'Game Development', level: 'Intermediate', image: '/assets/unity-logo.png' },
    { title: 'Digital Design with Photoshop', description: 'Learn the ins and outs of Photoshop, including photo editing, digital drawing, and compositing. Master techniques to create stunning visuals for web, print, and social media.', category: 'Design', level: 'Beginner', image: '/assets/photoshop-logo.png' },
    { title: 'Introduction to Digital Marketing', description: 'Gain foundational knowledge of digital marketing strategies. Learn about SEO, social media, content creation, and email marketing to boost online brand presence.', category: 'Marketing', level: 'Beginner', image: '/assets/digital-marketing.png' },
    { title: 'Advanced SEO Techniques', description: 'Deep dive into advanced SEO strategies to optimize your website for search engines. Learn about keyword research, link-building, and technical SEO for higher rankings and more traffic.', category: 'Marketing', level: 'Advanced', image: '/assets/seo-logo.png' },
    { title: 'DevOps with Docker and Kubernetes', description: 'Learn containerization and orchestration using Docker and Kubernetes. Understand how to automate workflows, deploy applications, and manage microservices in DevOps environments.', category: 'IT', level: 'Advanced', image: '/assets/docker-logo.png' },
    { title: 'Kubernetes for Developers', description: 'Explore how to manage containerized applications at scale with Kubernetes. Learn how to deploy, monitor, and scale applications on a Kubernetes cluster.', category: 'IT', level: 'Intermediate', image: '/assets/kubernetes-logo.png' },
    { title: 'Rust Programming for Performance', description: 'Learn Rust programming to build fast, memory-efficient, and safe applications. Focus on systems programming and high-performance computing using Rust’s concurrency model.', category: 'Programming', level: 'Advanced', image: '/assets/rust-logo.png' },
    { title: 'Cross-Platform Mobile Development with Flutter', description: 'Build mobile apps with Flutter, a framework for creating natively compiled applications for mobile, web, and desktop from a single codebase.', category: 'Mobile Development', level: 'Intermediate', image: '/assets/flutter-logo.png' },
    { title: 'Introduction to Photography', description: 'Learn photography basics, including composition, exposure settings, and lighting. Understand how to capture professional-quality images in various environments.', category: 'Design', level: 'Beginner', image: '/assets/photography.png' },
    { title: 'Video Production and Editing', description: 'Learn how to shoot and edit professional-quality videos. Gain expertise in video composition, color grading, and audio editing to create impactful content for film, TV, and online platforms.', category: 'Design', level: 'Intermediate', image: '/assets/video-editing.png' },
    { title: 'Project Management for Professionals', description: 'Learn project management tools and methodologies such as Agile and Waterfall. Understand how to plan, execute, and manage complex projects in diverse industries.', category: 'Business', level: 'Advanced', image: '/assets/project-management.png' },
    { title: 'Mastering Public Speaking', description: 'Develop public speaking skills to confidently deliver presentations. Learn techniques for effective communication, audience engagement, and speech structure for various settings.', category: 'Communication', level: 'Intermediate', image: '/assets/public-speaking.png' },
    { title: 'Excel for Business Analytics', description: 'Master advanced Excel features, including pivot tables, complex formulas, and data visualization techniques. Learn how to analyze and present data effectively in a business context.', category: 'Business', level: 'Advanced', image: '/assets/excel-logo.png' },
    { title: 'UI/UX Design with Figma', description: 'Learn to design user interfaces and experiences using Figma. Understand the design process from wireframing to prototyping, and create interactive designs for websites and apps.', category: 'Design', level: 'Intermediate', image: '/assets/figma-logo.png' }

];

Course.insertMany(courses)
    .then(() => {
        console.log('Courses added successfully');
        mongoose.connection.close();
    })
    .catch(err => console.log(err));
