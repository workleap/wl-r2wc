import { renderWidgets } from "/cdn/index.js";
        
renderWidgets();

updateHeaderData("header1", "1");
updateTriggerData("trigger1");

function updateTriggerData(triggerId) {
    const trigger = document.getElementById(triggerId);
    trigger.data = {
        text: "Change theme!"
    }
}

function updateHeaderData(headerId, orgId) {
    const header = document.getElementById(headerId);

    header.data = {
        getData: () => getSampleData(orgId), 
        //refetchSignal: controller.signal,
        onOrganizationChange: newOrgId => {
            updateHeaderData("header1", newOrgId);          
        }, 
        hamburger: {
            onClick: () => console.log("Sidenav toggled")
        },
        title: "Workleap -- Organization Id: " + orgId,
        icon: {
            src: "/workleap.svg",
            alt: "Workleap logo"
        },
        notifications: {
            onClick: () => console.log("Notifications toggled")
        },
        links: {
            whatsNew: { href: "/whats-new" },
            signOut: { onClick: () => {alert("signed out!");} },
            settings: { href: "/settings" },
            help: { href: "/help" },
            profile: { href: "/profile" }
        },
        //track: track, // your tracking function
        language: "en",
        desktopMinWidth: 992
    };
}

function getSampleData(currentOrganizaionId) {
    return {
        "products": {
            "assignedProducts": [
                {
                    "identifier": "wov",
                    "isNew": false,
                    "isExternal": false,
                    "iconUrl": "/product-logos/officevibe-logo.svg",
                    "activeIconUrl": "/product-logos/officevibe-logo-active.svg",
                    "redirectUrl": "https://app.officevibe.com/"
                },
                {
                    "identifier": "onb",
                    "isNew": false,
                    "isExternal": false,
                    "iconUrl": "/product-logos/onboarding-logo.svg",
                    "activeIconUrl": "/product-logos/onboarding-logo-active.svg",
                    "redirectUrl": "https://onboarding.workleap.com/"
                },
                {
                    "identifier": "wpm",
                    "isNew": true,
                    "isExternal": false,
                    "iconUrl": "/product-logos/performance-logo.svg",
                    "activeIconUrl": "/product-logos/performance-logo-active.svg",
                    "redirectUrl": "https://performance.workleap.com/"
                }
            ],
            "unassignedProducts": [
                {
                    "identifier": "lms",
                    "isNew": true,
                    "isExternal": false,
                    "iconUrl": "/product-logos/lms-logo.svg",
                    "activeIconUrl": "/product-logos/lms-logo-active.svg",
                    "redirectUrl": "https://app.talentscope.work/"
                },
                {
                    "identifier": "sks",
                    "isNew": true,
                    "isExternal": false,
                    "iconUrl": "/product-logos/skills-logo.svg",
                    "activeIconUrl": "/product-logos/skills-logo-active.svg",
                    "redirectUrl": "https://app.talentscope.work/"
                },
                {
                    "identifier": "wsg",
                    "isNew": false,
                    "isExternal": true,
                    "iconUrl": "/product-logos/sharegate-logo.svg",
                    "activeIconUrl": "/product-logos/sharegate-logo-active.svg",
                    "redirectUrl": "https://home.sharegate.com/"
                },
                {
                    "identifier": "pbd",
                    "isNew": false,
                    "isExternal": true,
                    "iconUrl": "/product-logos/pingboard-logo.svg",
                    "activeIconUrl": "/product-logos/pingboard-logo-active.svg",
                    "redirectUrl": "https://workleap.pingboard.com/"
                }
            ]
        },
        "userInfo": {
            "name": "Jane Cooperini",
            "avatarUrl": "https://raw.githubusercontent.com/gsoft-inc/wl-orbiter/master/packages/components/src/avatar/docs/assets/hadfield.png",
            "canEditProfile": true
        },
        "organizations": [
            {
                "id": "1",
                "isCurrentOrganization": currentOrganizaionId === "1",
                "image": "https://picsum.photos/200/300",
                "displayName": "AskNoQuestions Inc."
            },
            {
                "id": "2",
                "isCurrentOrganization": currentOrganizaionId === "2",
                "image": null,
                "displayName": "Brighteye Software"
            }
        ]
    };
}