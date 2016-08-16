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


# Contact
Maxime Pawlak - Simplon Midi-Pyrénées - mpawlak@simplon.co