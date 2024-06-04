Krijimi i nje aplikacioni per listimin e puneve

Kerkesat:

Aplikacioni duhet të kryejë funksionalitetet:

I.	Login/Regjistrim

•	Përdoruesit duhet të jenë në gjendje të Regjistrohen dhe të bëjnë Login.
•	Duhet të ketë dy role, punëdhënës (rekrutues) dhe punëmarrës.

II.	Oferta të punës
•	Rekrutuesit duhet të jenë në gjendje të krijojnë/ndryshojnë/fshijnë/përditësojnë (CRUD) listat e tyre të punës.
•	Të implementohet një funksionalitet kërkimi për pozicionet e punës që punëdhënësi ka krijuar.

III.	Kërkues të punës (përdorues të thjeshtë)
•	Në faqen kryesore të aplikacionit duhet të shfaqet një listë e ofertave të punës.
•	Duke klikuar në një ofertë pune duhet të shfaqen detajet e punës.
•	Punëmarrësi duhet të jetë në gjendje të filtrojë ofertat e punës bazuar në profilin e punës që ai/ajo po kërkon.
•	Punëmarrësi duhet të jetë në gjendje të shënojnë një ofertë pune si të preferuar.
•	Të gjithë punëmarrësit duhet të kenë një faqe profili.
•	Në faqen e profilit të punëmarrësit duhet të shfaqen informacionet e tij/ saj, një listë e punëve për të cilat ka aplikuar dhe të gjitha punët që i ka shënuar si të preferuara.

IV.	Funksionaliteti Logout.

V.	Aplikacioni duhet të jetë responsive për madhësi të ndryshme ekrani.

* Mund të shtoni funksionalitete të tjera sipas dëshirës.





Teknologjite e perdorura:
•	Angular
•	Firebase

Rolet:
•	Employer
•	Employee 

Funksionalitet e perbashketa:
•	Register/Log In
•	Log Out

Funksionalitet e Employer:
•	Create/Edit/Delete Postimet e punes
•	Shiko kerkesat e ardhura per punesim
•	Shiko postimet e krijuara

Funksionalitet e Employee:
•	Look/Search per Postimet e punes
•	Apply/Add to Wishlist Postimet e punes
•	Shiko Aplikimet e puneve te kryera
•	Shiko Postimet ne Wishlist


Krijimi i Aplikacionit:

Hapat e pare:
Krijimi i fileve te thjeshta te html,css sic jane componentet Home, About,Contact,Navbar-simple, Footer, te cilat jane pa permbajtje typescript ne te dhe vetem per pjesen vizuale dhe informative per webin per te cilin po krijojme.

Krijimi i Log In/Register:
Per database kemi perdorur Firebase, e cila lehtesisht implementohet ne Angular dhe ane te komandave te CLI, dhe na lejojn qe te ruajme informacionin lehtesisht. Per Register jane perdorur 2 forma, nje per Employer dhe nje per Employee, te cilat dergojne te dhenat ne databaze dhe me pas, keto te dhena do te kontollohen ne formen e Log In, ne momentin qe useri do te tentoj te identifikohet. Me pas, ne baze te rolit te userit, ai do te behet ridrejtimi ne dashboardin perkates.

Krijimi i Rolit te Employer:
Employer, pasi identifikohet, drejtohet ne dashboardin e Employerit. Aty ai do te gjej disa informacione per veten dhe postimet e krijuara nga ai, me mundesine per ti fshire ose edituar. Navbar-Employer permban 4 element: Dashboard,New Post, Messages, Log out. New Post i jep mundsine Employer-it qe te krijoj nje postime te ri, i cili pas krijimit dergohet ne databaze  dhe Employee kane mundesine qe ta shohin. Messages lejon Employer-in qe te shikoj te gjitha kerkesat e puneve qe jane derguar nga Employee, me disa nga informacionet e tyre dhe CV e bashkangjitur. Funksioni Log Out mbyll sessionin e Employer-it dhe ben ridrejtimin ne faqen Home.

Krijimi i Rolit te Employee:
Employee, pasi identifikohet, drejtohet ne dashboardin e Employee. Aty ai ka mundesine qe te shikoj te gjitha ofertat e puneve te krijuara nga Employer. Ai gjithashtu ka mundesine qe te kerkoj pune specifike, ne baze te Search Bar i cili ndodhet ne Dashboard. Tek punet te cilat shfaqen, Employee ka mundsine qe te Aplikoj per pune , duke hapur nje form  te re dhe te japi disa informacione mbi veten dhe te bashkangjis nje CV, ose te klikoje ”Add to Wishlist” dhe puna te shtohet ne wishlist. Navbar-Employee ka 4 elemente: Dashboard,Applied Job,Wishlist,Log out. Ne Applied Jobs, Employee ka mundesine te shikoj aplikimet e tij per pune, ndersa Wishlist te shikoj punet te cilat ai ka perzgjedhur. Funksioni Log out mbyll sessionin dhe ben ridrejtimin ne faqen Home.

