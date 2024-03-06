const http = require('http');

const menuItems = [
    {
        "component": "NavTitle",
        "name": "INSTITUTE"
    },
    {
        "component": "NavItem",
        "name": "Home",
        "to": "home",
        "badge": {
            "color": "info",
            "text": "NEW"
        },
        "permissionId": 8
    },
    {
        "component": "NavItem",
        "name": "My Institutions",
        "to": "my-institutions",
        "permissionId": 3
    },
    {
        "component": "NavItem",
        "name": "My Classes",
        "to": "my-classes",
        "badge": {
            "color": "info",
            "text": "NEW"
        },
        "permissionId": 6
    },
    {
        "component": "NavGroup",
        "name": "Analytics",
        "to": "analytics",
        "permissionId": 2,
        "items": [
            {
                "component": "NavItem",
                "name": "Institute Overview",
                "to": "analytics/data-overview",
                "permissionId": 2
            }
        ]
    },
    {
        "component": "NavItem",
        "name": "Knowledge Meter",
        "to": "knowledge-meter",
        "badge": {
            "color": "info",
            "text": "NEW"
        },
        "permissionId": 2
    },
    {
        "component": "NavGroup",
        "name": "Micro Learning",
        "to": "micro-learning",
        "permissionId": 4,
        "items": [
            {
                "component": "NavItem",
                "name": "Management",
                "to": "micro-learning/management",
                "permissionId": 8
            },
            {
                "component": "NavItem",
                "name": "Student View",
                "to": "micro-learning/studentview",
                "permissionId": 4
            }
        ]
    },
    {
        "component": "NavGroup",
        "name": "My Tests",
        "to": "tests",
        "permissionId": 4,
        "items": [
            {
                "component": "NavItem",
                "name": "Scheduled Tests",
                "to": "tests/scheduled-tests",
                "permissionId": 6
            },
            {
                "component": "NavItem",
                "name": "Tests Repository",
                "to": "tests/test-repository",
                "permissionId": 6
            },
            {
                "component": "NavItem",
                "name": "Reports",
                "to": "tests/reports",
                "permissionId": 6
            }
        ]
    },
    {
        "component": "NavTitle",
        "name": "RESOURCE LINKS"
    },
    {
        "component": "NavItem",
        "name": "Assets",
        "to": "assets",
        "permissionId": 5
    },
    {
        "component": "NavItem",
        "name": "Teacher Resources",
        "to": "teacher-resources",
        "permissionId": 2
    },
    {
        "component": "NavGroup",
        "name": "Videos",
        "to": "videos",
        "permissionId": 2,
        "items": [
            {
                "component": "NavItem",
                "name": "Concept Videos",
                "to": "videos/concept-videos",
                "permissionId": 3
            }
        ]
    },
    {
        "component": "NavGroup",
        "name": "Question Bank",
        "to": "questionbank",
        "permissionId": 4,
        "items": [
            {
                "component": "NavItem",
                "name": "Publisher Questions",
                "to": "questionbank/pub-questions",
                "permissionId": 5
            },
            {
                "component": "NavItem",
                "name": "My Questions",
                "to": "questionbank/my-questions",
                "permissionId": 8
            },
            {
                "component": "NavItem",
                "name": "My Institution Questions",
                "to": "questionbank/institute-questions",
                "permissionId": 4
            }
        ]
    },
    {
        "component": "NavItem",
        "name": "Chapters & Topics",
        "to": "chapter-topics",
        "permissionId": 3
    },
    {
        "component": "NavGroup",
        "name": "Teacher Training",
        "to": "teacher-training",
        "permissionId": 8,
        "items": [
            {
                "component": "NavItem",
                "name": "Live Classes",
                "to": "teacher-training/live-classes",
                "permissionId": 4
            },
            {
                "component": "NavItem",
                "name": "Training Materials",
                "to": "teacher-training/training-material",
                "permissionId": 5,
                "items": [
                    {
                        "component": "NavItem",
                        "name": "Documents",
                        "to": "tests/scheduled-tests/documents",
                        "permissionId": 7
                    },
                    {
                        "component": "NavItem",
                        "name": "Tests",
                        "to": "tests/test-repository/tests",
                        "permissionId": 3
                    }
                ]
            }
        ]
    },
    {
        "component": "NavItem",
        "name": "Attendance",
        "to": "attendance",
        "permissionId": 5
    },
    {
        "component": "NavTitle",
        "name": "ADMIN"
    },
    {
        "component": "NavItem",
        "name": "Administration",
        "to": "administration",
        "permissionId": 5
    }
]

const playWithJson = (menuItems) => {
    const filteredData = filterData(menuItems); 
    sendRequests(filteredData);
}

const filterData = (menuItems) => {
    return menuItems.filter(item => {
        if (item.component === 'NavGroup' && item.items) {
            const hasValidChildItems = item.items.some(child => child.permissionId >= 5 && child.permissionId <= 8);
            if (!hasValidChildItems) {
                return false;
            }
        }

        if (item.permissionId === 3 || item.permissionId === 4) {
            if (item.items) {
                const invalidChildItems = item.items.some(child => !(child.permissionId === 5 || child.permissionId === 8));
                if (invalidChildItems) {
                    return false;
                }
            }
            return true;
        }

        return false;
    });
};

const sendRequests = (data) => {
    if (data.length === 0) {
        console.log("All requests sent.");
        return;
    }

    const firstElement = data.shift();
    const requestData = JSON.stringify(firstElement);

    const options = {
        hostname: 'pmponline.co.in',
        port: 80,
        path: '/sdetest/requests.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': requestData.length
        }
    };

    const req = http.request(options, (res) => {
        console.log(`Request sent. Status: ${res.statusCode}`);

        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            console.log('Response received:', responseData);
            sendRequests(data); // Repeat the process for remaining data
        });
    });

    req.on('error', (error) => {
        console.error('Error sending request:', error);
        sendRequests(data); // Retry with next data even if request fails
    });

    req.write(requestData);
    req.end();
};

playWithJson(menuItems);
