How to run application
1. npm install
2. node server

1. Database Schema -> models/...
- Race = รายการแข่งขัน
- Profile = ข้อมูลนักกีฬา

2. Authentication 
ใช้ JWT Passport โดย ใช้ Model User ในการตรวจสอบ

3.REST API Endpoints

Race
GET / Get all races.
POST / Add new race.
{
    "title": "Orange Cap Marathon 2021",
    "distance": "10K"
}
PUT /:id Update race.
{
    "distance": "21K"
}


Profile
GET / Get all profiles.
GET /:id Get prifile by id.
POST / Add new profile (first time).
{
    "race": "601ba3c411d3a8841ba9c275",
    "title": "นาย",
    "firstName": {
        "th": "จอห์น",
        "en": "John"
    },
    "lastName": {
        "th": "โด",
        "en": "Doe"
    },
    "birthdate": "1990-02-26",
    "email": "john_doe@email.com",
    "idCareNo": "0000000000000",
    "address": "1 ถ.สุขุมวิท 71 แขวงพระโขนงเหนือ เขตวัฒนา กทม.",
    "contact": "0900000000",
    "bibName": "A0001"
}

PUT /:id Update profile (step 2, 3, 4, 5).

Step 2
{
    "applicantBackground": {
        "isPreviouslyRun": true,
        "expectTime": "0:50"
    }
}

Step 3
{
    "emergencyContact": {
        "contact1": {
            "fullName": "สมหญิง",
            "relationship": "มารดา",
            "telephoneNo": "0809999999"
        },
        "contact2": {
            "fullName": "สมศักดิ์",
            "relationship": "บิดา",
            "telephoneNo": "0990009999"
        }
    }
}

Step 4
{
    "medicalInformation": {
        "bloodType": "A",
        "medicalAllergy": {
            "isMatch": false
        },
        "chronicHealth": {
            "isMatch": false
        },
        "surgeryBefore": {
            "isMatch": false
        },
        "medicineToTake": {
            "isMatch": true,
            "detail": "ยาแก้แพ้"
        },
        "injuryFromMarathon": {
            "isMatch": true,
            "detail": "รายการวิ่งบางแสน"
        },
        "isOftenExcercise": true,
        "triedDuringWorkout": {
            "isMatch": false
        }
    }
}

Step 5
{
    "souvenir": {
        "tShirt": {
            "size": "L"
        }
    }
}


PUT /:id/upload Update photo.
* ส่งเป็น form-data 
Key: recentPhoto (file)

PUT /:id/confirm Confirm profile.
DELETE /:id Delete profile.

