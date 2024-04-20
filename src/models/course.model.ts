export interface Thumbnail {
    public_id: string;
    url: string;
}

export interface Categories {
    _id: string;
    title: string;
}

export interface Link {
    title: string;
    url: string;
    _id: string;
}

export interface Benefit {
    title: string;
    _id: string;
}

export interface CourseContent {
    videoUrl: string;
    title: string;
    videoSection: string;
    description: string;
    suggestion: string;
    links: Link[];
    _id: string;
    reviews: any[]; // Assuming this can be of any type
    questions: any[]; // Assuming this can be of any type
}

export interface Prerequisite {
    title: string;
    _id: string;
}

export interface Course {
    instructor?: string,
    thumbnail: Thumbnail;
    isBlocked: boolean;
    status: string;
    _id: string;
    name: string;
    description: string;
    price: number;
    estimatePrice: number;
    categories: Categories;
    level: string;
    ratings: number;
    purchased: number;
    demoUrl: string;
    benefits: Benefit[];
    courseContentData: CourseContent[];
    prerequisites: Prerequisite[];
    totalVideos: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const course: Course = {
    "thumbnail": {
        "public_id": "courses/rasrn1dkma55gqs055mh",
        "url": "https://res.cloudinary.com/didw3mt8i/image/upload/v1713375300/courses/rasrn1dkma55gqs055mh.png"
    },
    "isBlocked": false,
    "status": "Not Active",
    "_id": "6620083db768ce5cedd789a9",
    "name": "654334",
    "description": "5435435",
    "price": 435435435,
    "estimatePrice": 54354354353,
    "categories": {
        "_id": "661f6c21ec94b12fab3bf464",
        "title": "Creative Crafts for Kids"
    },
    "level": "Basic",
    "ratings": 0,
    "purchased": 0,
    "demoUrl": "4543543543",
    "benefits": [
        {
            "title": "43534543543",
            "_id": "6620083db768ce5cedd789aa"
        }
    ],
    "courseContentData": [
        {
            "videoUrl": "5345",
            "title": "34534",
            "videoSection": "Untitled Section",
            "description": "345",
            "suggestion": "",
            "links": [
                {
                    "title": "43534",
                    "url": "5345435",
                    "_id": "6620083db768ce5cedd789ac"
                }
            ],
            "_id": "6620083db768ce5cedd789ab",
            "reviews": [],
            "questions": []
        }
    ],
    "prerequisites": [
        {
            "title": "345435",
            "_id": "6620083db768ce5cedd789ad"
        }
    ],
    "totalVideos": 1,
    "createdAt": "2024-04-17T17:34:53.344Z",
    "updatedAt": "2024-04-17T17:34:53.344Z",
    "__v": 0
};
