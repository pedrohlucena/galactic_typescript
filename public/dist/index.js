let spaceships = [];
function showMenu() {
    let chosenOption = '0';
    while (chosenOption != '1' && chosenOption != '2' && chosenOption != '3' && chosenOption != '4' && chosenOption != '5') {
        chosenOption = String(prompt('O que você desejar fazer?' +
            '\n1- Cadastrar uma nova nave' +
            '\n2- Adicionar um membro à uma nave' +
            '\n3- Enviar uma nave para uma missão' +
            '\n4- Listar naves' +
            '\n5- Sair do programa' +
            '\nDigite o número correspondente à opção desejada'));
    }
    return chosenOption;
}
function saveSpaceship(name, pilot, crewLimit) {
    let emptyArray = [];
    let spaceship = {
        name,
        pilot,
        crewLimit,
        crew: emptyArray,
        inMission: false
    };
    spaceships.push(spaceship);
    alert(`Nave "${name}" criada!`);
}
function forWhichSpaceship(action) {
    let spacechipNamesArray = spaceships.map(currentSpaceship => {
        return currentSpaceship.name;
    });
    let listOfSpaceships = '';
    spacechipNamesArray.forEach((spaceshipName, index) => {
        listOfSpaceships += `${index + 1}- ${spaceshipName}\n`;
    });
    let spaceshipChoosed = Number(prompt('Você tem as seguintes naves:\n' +
        listOfSpaceships +
        `\nVocê quer realizar a ação de "${action}" para qual dessas naves? Digite o número correspondente à ela`));
    return spaceships[spaceshipChoosed - 1];
}
function addNewMemberToSpaceship() {
    let spaceshipChoosed = forWhichSpaceship('Adicionar novo membro à uma nave');
    let newMember = String(prompt('Qual o nome do novo membro?'));
    if (spaceshipChoosed.crew.length >= spaceshipChoosed.crewLimit) {
        alert(`Desculpe, o "${newMember} não pode ser adicionado à nave! Limite atingido."` +
            '\nQuantidade de tripulantes: ' + spaceshipChoosed.crew.length +
            '\nQuantidade máxima permitida: ' + spaceshipChoosed.crewLimit);
    }
    else {
        spaceshipChoosed.crew.push(newMember);
        alert(`Tripulante "${newMember}" adicionado!` +
            '\nQuantidade de tripulantes: ' + spaceshipChoosed.crew.length +
            '\nQuantidade máxima permitida: ' + spaceshipChoosed.crewLimit);
    }
}
function sendSpaceshipToMission() {
    let spaceshipChoosed = forWhichSpaceship('Mandar para missão');
    let numberOfCrew = spaceshipChoosed.crew.length;
    let minimumAmountToSendToMission = Math.floor(spaceshipChoosed.crewLimit / 3);
    if (spaceshipChoosed.inMission) {
        alert(`A nave "${spaceshipChoosed.name} já está em um missão!`);
    }
    else if (numberOfCrew < minimumAmountToSendToMission) {
        alert(`A nave "${spaceshipChoosed.name}" não tem 1/3 de sua tripulação preenchida, logo, ela não pode ir à uma missão!` +
            `\nQuantidade de tripulantes: ${numberOfCrew}` +
            `\nQuantidade mínima para ir à uma missão: ` + minimumAmountToSendToMission);
    }
    else {
        let confirmation = confirm(`Confirmar partida da nave "${spaceshipChoosed.name}"?`);
        if (confirmation) {
            spaceshipChoosed.inMission = true;
            alert(`Nave "${spaceshipChoosed.name}" enviada para uma missão!`);
        }
        else {
            alert(`A nave "${spaceshipChoosed.name}" não foi enviada para uma missão.`);
        }
    }
}
function listSpaceshipsInfo() {
    let messageWithSpaceshipInfo = '';
    let crew = string = '';
    spaceships.forEach((currentSpaceship, index) => {
        crew = currentSpaceship.crew.join();
        messageWithSpaceshipInfo += `${index + 1}- ${currentSpaceship.name.toUpperCase()}` +
            `\n- Piloto: ${currentSpaceship.pilot}` +
            `\n- Tripulação: ${crew}` +
            `\n- Número máximo de tripulantes: ${currentSpaceship.crewLimit}` +
            `\n- Está em missão: ${currentSpaceship.inMission ? 'Sim' : 'Não'}\n`;
    });
    alert(`Suas espaçonaves:\n${messageWithSpaceshipInfo}`);
}
function registerSpaceship() {
    let confirmation = false;
    let spaceshipName;
    let pilotName;
    let crewLimit;
    while (confirmation != true) {
        spaceshipName = String(prompt('Qual o nome da sua espaçonave?'));
        pilotName = String(prompt(`Qual o nome do piloto da "${spaceshipName}"?`));
        crewLimit = Number(prompt('Qual a quantidade máxima de tripulantes que sua nave suporta?'));
        confirmation = confirm(`Confirma o registro da nave "${spaceshipName}"?\nPiloto: ${pilotName}\nTamanho da Tripulação: ${crewLimit}`);
    }
    saveSpaceship(spaceshipName, pilotName, crewLimit);
}
// start here
let chosenOption = '1';
while (chosenOption != '5') {
    chosenOption = showMenu();
    switch (chosenOption) {
        case ('1'):
            registerSpaceship();
            break;
        case ('2'):
            addNewMemberToSpaceship();
            break;
        case ('3'):
            sendSpaceshipToMission();
            break;
        case ('4'):
            listSpaceshipsInfo();
            break;
    }
}
alert('Saindo do programa...');
