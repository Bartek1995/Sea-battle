const array = []

var game_started = false
var generate_ship_side
var attack_counter = 0
var hit_counter = 0
var miss_counter = 0
// IN COLUMNS GENERATE FIELDS AND SET CLASS
for(let i= 0; i < 10; i++){
    i_as_string = i.toString();
    var div = document.createElement('div')
    div.className = 'row ' + 'row' + i_as_string
    document.body.appendChild(div)
    array[i] = []
    // IN ROWS GENERATE FIELDS AND SET CLASS
    for (let a= 0; a < 10; a++){
        a_as_string = a.toString();
        var field = document.createElement('div');
        field.className = 'field '
        field.id = 'row'+ i +'-field' +a_as_string;
        div.appendChild(field)
        ship = false
        array[i][a] = ship
    }
} 

function checkGameStateAndModifyButtons(){
    //THIS FUNCTION IS FOR CHECKING GAME STATE IF GAME IS STARTED OR NOT THEN FUNCTION MODIFY SHOW/HIDE BUTTONS ON SITE AND MODIFY DESCRIPTION 
    if (game_started == false){
        var button_cheat_mode_show_ships = document.createElement('button')
        var button_new_game = document.createElement('button')
        var button_start_game = document.getElementById('start-game')

        button_start_game.innerHTML = "Kolejny Atak!"
        
        button_cheat_mode_show_ships.className = "btn btn-warning"
        button_cheat_mode_show_ships.innerHTML = "Tryb oszusta - Pokaż statki"
        button_new_game.className = "btn btn-success"
        button_new_game.innerHTML = "Nowa gra"
        button_new_game.onclick = newGame
        button_cheat_mode_show_ships.onclick = showShips
        div = document.getElementById('game-rules')
        div.appendChild(button_new_game)
        div.appendChild(button_cheat_mode_show_ships)
    }


}

function newGame(){ //RELOAD PAGE FUNCTION
    location.reload()
}


function showShips(){
    //CHEATING FUNCTION - SHOWS ALL SHIPS AND CHANGE THEIR COLOR FOR GOLD 
    //I USE THIS FUNCTION FOR TESTING POSITION OF SHIPS
    for (let i = 0; i < 10; i++){
        for(let a = 0; a < 10; a++){
            if (array[i][a] == true){
                field = document.getElementById('row'+i +'-field'+a)
                if (field.style.backgroundColor != 'green')
                    field.style.backgroundColor = 'gold';
            }
    }
        
}
}

function checkFieldAvability(check_type, row_value, column_value, required_fields_for_ship){
    //THIS FUNCTION IS USED INSIDE 'generateShip' FUNCTION.
    //THAT FUNCITON TAKE 4 PARAMETERS, WHOSE ARE GENERATED IN generateShip FUNCTION
    //BASED ON THERE PARAMETERS, FUNCTION CHECK FIELDS AVABILITY TO PLACE NEW SHIP
    switch (check_type){

        case 0:

            if (column_value >= 0 && column_value <= 9 - (required_fields_for_ship - 1)){
                document.write('case0scenariusz1' + required_fields_for_ship+'|')
                for(let a = 0; a < required_fields_for_ship; a++)
                    if (array[generated_row_number][generated_column_number + a] == true){
                        return false
                    }
                    else if (a == (required_fields_for_ship - 1) && array[generated_row_number][generated_column_number + a] == false){// CHECKING AVABILITY OF THIS FIELDS IN LOOP TO ASSIGN NEW SHIP
                        generate_ship_side = 'right'
                        return true
                    } 
            }
                
            else if (column_value <= 9 && column_value >= 0 + (required_fields_for_ship - 1)){
                document.write('case0scenariusz2' + required_fields_for_ship+'|')
                for(let a = 0; a < required_fields_for_ship; a++)
                    if (array[generated_row_number][generated_column_number - a] == true) {
                        return false
                    }
                    else if (a == (required_fields_for_ship - 1) && array[generated_row_number][generated_column_number - a] == false){// CHECKING AVABILITY OF THIS FIELDS IN LOOP TO ASSIGN NEW SHIP
                        generate_ship_side = 'left'
                        return true
                    }
            }  
            break
        case 1:
            
            if (row_value >= 0 && row_value <= 9 - (required_fields_for_ship - 1)){
                document.write('case1scenariusz1' + required_fields_for_ship+'|')
                for(let a = 0; a < required_fields_for_ship; a++)
                    if (array[generated_row_number + a][generated_column_number] == true){
                        return false
                    }
                    else if (a == (required_fields_for_ship - 1) && array[generated_row_number + a][generated_column_number] == false){// CHECKING AVABILITY OF THIS FIELDS IN LOOP TO ASSIGN NEW SHIP
                        generate_ship_side = 'down'
                        return true
                    } 
            }
    
            else if (row_value <= 9 && row_value >= 0 + (required_fields_for_ship - 1)){
                document.write('case1scenariusz2' + required_fields_for_ship+'|')
                for(let a = 0; a < required_fields_for_ship; a++)
                    if (array[generated_row_number - a][generated_column_number] == true) {
                        return false
                    }

                    else if (a == (required_fields_for_ship - 1) && array[generated_row_number - a][generated_column_number] == false){// CHECKING AVABILITY OF THIS FIELDS IN LOOP TO ASSIGN NEW SHIP
                        generate_ship_side = 'up'
                        return true
                    }
            }      
            break
    }
}

function generateShip(ship_size){
    //THIS FUNCTION GENERATE SHIP IN LOOP
    //FUNCTION TAKE ONE PAREMETER - SHIP SIZE

    
    while (true){
        generated_row_number = getRandomNumberMax9()
        generated_column_number = getRandomNumberMax9()
        let draw_horizontal_or_vertical = Math.floor(Math.random() * 2);
        let check_status = checkFieldAvability(draw_horizontal_or_vertical, generated_row_number, generated_column_number, ship_size)
        if (check_status == false)
            continue
        else{

            if (generate_ship_side == 'right')
                for(let i = 0; i < ship_size; i++)
                    array[generated_row_number][generated_column_number + i] = true
            else if (generate_ship_side == 'left')
                for(let i = 0; i < ship_size; i++)
                    array[generated_row_number][generated_column_number - i] = true
            else if (generate_ship_side == 'down')
                for(let i = 0; i < ship_size; i++)
                    array[generated_row_number + i][generated_column_number] = true
            else if (generate_ship_side == 'up')
                for(let i = 0; i < ship_size; i++)
                    array[generated_row_number - i][generated_column_number] = true
        }
            
        break 
        }
    }



function generateShips(){
    generateShip(1)
    generateShip(2)
    generateShip(3)
    generateShip(4)

}




function getRandomNumberMax9(){
    //NUMBER GENERATOR
    
    number = Math.floor(Math.random() * 10);
    return number
}

function selectFieldToAttack(){
    //CHOOSE FIELD TO ATTACK FUNCTION - INTEGRATING WITH USER ACTIONS
    row = prompt("Podaj rząd: \nPrzykład A, B, C\nNacisnij anuluj aby wyświetlić aktualizację planszy")
    row = row.toUpperCase()
    row = row.charCodeAt(0) - 65;
    column = prompt("Podaj kolumne: \nPrzykład 1, 2, 3\nNacisnij anuluj aby wyświetlić aktualizację planszy")
    column = Number(column)
    column -= 1
    field_id = 'row'+ row +'-field' +column;
    field_object = document.getElementById(field_id)
    checkGameStateAndModifyButtons()
    game_started = true
    return array[row][column]
}

function attackEnemy(){
    while (true){
        field = selectFieldToAttack()
        
        all_hits = document.getElementById('counter-value')
        hit = document.getElementById('hit-counter-value')
        miss = document.getElementById('miss-counter-value')

        if (field == true){
            if (field_object.style.backgroundColor != 'green'){
                field_object.style.backgroundColor = 'green'
                alert('Trafiony')
                attack_counter++
                hit_counter++
                all_hits.innerHTML = attack_counter
                hit.innerHTML = 'Ilość trafień = ' + hit_counter
                break
            }
            else {
                alert('Już strzelałeś w to miejsce')
                continue
            }
        }
        else{
            field_object.style.backgroundColor = 'red'
            attack_counter++
            miss_counter++
            all_hits.innerHTML = attack_counter
            miss.innerHTML = 'Pudło = ' + miss_counter
            alert('Pudło')
        }
    }
}

generateShips()
