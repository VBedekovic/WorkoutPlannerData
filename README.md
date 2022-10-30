# WorkoutPlannerData
Repozitorij sadrži otvorene podatke planiranja tjelovježbi u teretani ili prirodi na engleskom jeziku. Sadrži dump baze podataka gdje se nalaze podaci te zapisi tih podataka u CSV i JSON formatu. 

## Opis skupa podataka
Podaci sadrže plan treninga (workouts) s njihovim bitnim značkama i sadrže jednu ili više tjelovježbi (exercises) s određenim ponavljanjima i težinom vježbe.


**Licencija:** Creative Commons BY-SA - Imenovanje, dijeli pod istim uvjetima\
**Autor**: Vedran Bedeković\
**Verzija**: 1.0\
**Jezik podataka**: Engleski\
**Atributi**:\
              &emsp;<ins>name</ins> - naziv treninga\
              &emsp;<ins>workout_type</ins> - određuje tip treninga\
              &emsp;<ins>target_muscle_groups</ins> - lista ciljanih mišićnih skupina u treningu\
              &emsp;<ins>duration</ins> - određuje trajanje treninga\
              &emsp;<ins>rest_interval</ins> - određuje vrijeme odmora između serija i vježbi\
              &emsp;<ins>time_of_day</ins> - određuje doba dana kada odraditi trening\
              &emsp;<ins>weekday</ins> - određuje koji dam u tjednu odraditi trening (od 1 == Pon do 7 == Ned)\
              &emsp;<ins>water_intake_l</ins> - određuje preporučenu količinu vode u litrama \
              &emsp;<ins>environment</ins> - određuje okolinu u kojoj se odrađuje trening\
              &emsp;<ins>exercises</ins>; - lista vježbi koje sadrži trening\
                &emsp;&emsp;<ins>exercise_name</ins> - naziv vježbe\
                &emsp;&emsp;<ins>weight_from</ins> - početna kilaža u kilogramima\
                &emsp;&emsp;<ins>weight_to</ins> - maksimalna kilaža u kilogramima\
                &emsp;&emsp;<ins>weight_increment</ins> - određeno povećanje kilaže završetkom jednog ponavljanja\
                &emsp;&emsp;<ins>reps</ins> - broj ponavljanja u jednoj seriji\
                &emsp;&emsp;<ins>sets</ins> - broj ponavljanja serija\
**Datum izrade**: 28.10.2022.\
**Datum zadnje izmjene**: 28.10.2022.\
**Ključne riječi**: gym, workout, planner, exercise\
**Baza podataka**: PostgreSQL\
**Način zapisa**: UTF-8\
**Formati**: CSV i JSON
