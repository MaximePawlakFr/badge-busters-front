# Badge Busters
In order to make Simplon selection easier, Badge Busters (catch them all) enables to sum-up the Codecademy profiles of the candidates.

The process is in 2 steps : 
* fetch and save profiles
* display the profiles in a table

If you wonder why, it's because you will probably consult them more often than you update them (and updating them takes some time ~10 minutes).


# How to use

## Save profiles
* Just copy the column from the Google Spreadsheet 'Candidatures' and paste it into the first text area.
* Check that all links are separated by a line return and are valid links (like https://www.codecademy.com/{username})
* Find a name for your promo (if already exists, it will be updated, otherwise it will be created)
* And click on 'Fetch'
* Wait (it may take some minutes) ...

Badge busters will fetch profiles on Codecademy.com and then save them int a Firebase database. To know how to fetch them, keep reading ...


## Fetch profiles
After a couple of minutes, profiles are saved and you can display them in a beautiful table. It's very easy : 
* Fill the input with the name your selected before (warning: it's case sensitive)
* Click on 'GET PROMO !'
* Profiles will be displayed under seconds


# Why using an intermediate database ?
Parsing Codecademy profils takes some time (around 1 minute per profile). In order to avoir waiting 10 minutes each time you need to see the profiles, they are cached in a Firebase database. You can see the data the profiles have been updated in the column 'mis à jour le'.

# Api
* endpoint : http://badgebusters.simplon.xyz/api/profiles
* contentType: "application/json; charset=utf-8"

## Post codecademy urls
To save (or update) a promo, the endpoint is 
> http://badgebusters.simplon.xyz/api/profiles/{promoName}.

The body is a simple json { "links": [{ array of codecademy profile urls }] }.


For example,for a promo called *simplonmidipyrenees* , the 
endpoint is 
> http://badgebusters.simplon.xyz/api/profiles/simplonmidipyrenees

And the body : 
```json
{
  "links" : [
  		"https://www.codecademy.com/javaMaster49518",
  		"https://www.codecademy.com/fr/Sydjex",
  		"https://www.codecademy.com/LoubnaB",
  		"https://www.codecademy.com/boardAce96418"
  		]
}
```

## Get profiles
To get the list of profiles from a promo, a simple GET request to 
> http://badgebusters.simplon.xyz/api/profiles/{promoName}.

The response will be an array with profiles :
```json
[
    {
        "badgeNb": "2",
        "badges": [
            {
                "date": "Jun 13, 2016",
                "name": "First Lesson"
            },
            {
                "date": "Jun 13, 2016",
                "name": "Max Streak Count of 1"
            }
        ],
        "joined": "Joined Jun 13, 2016",
        "lastCoded": "Last coded 2 months ago",
        "pseudo": "AndyBlanchard",
        "skillsCompleted": "0",
        "totalPoints": "9",
        "ts": "2016-08-24T14:03:27.267Z",
        "url": "https://www.codecademy.com/AndyBlanchard",
        "username": "AndyBlanchard"
    },
    {
        "badgeNb": "4",
        "badges": [
            {
                "date": "May 30, 2016",
                "name": "Le b.a.-ba du langage HTML"
            },
            {
                "date": "May 30, 2016",
                "name": "10 Exercises"
            },
            {
                "date": "May 30, 2016",
                "name": "First Lesson"
            },
            {
                "date": "May 30, 2016",
                "name": "Max Streak Count of 1"
            }
        ],
        "joined": "Joined May 30, 2016",
        "lastCoded": "Last coded 2 months ago",
        "pseudo": "Odran Bernède",
        "skillsCompleted": "0",
        "totalPoints": "18",
        "ts": "2016-08-24T14:03:22.782Z",
        "url": "https://www.codecademy.com/boardAce96418",
        "username": "boardAce96418"
    }
]
```

# Contact
Maxime Pawlak - Simplon Midi-Pyrénées - mpawlak@simplon.co