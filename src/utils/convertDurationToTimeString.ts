export function convertDurationToTimeString(duration: number) {

    const hours = Math.floor(duration / 3600); //ou (60*60) -- Math.Floor arredonda pra baixo.
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const timeString = [hours, minutes, seconds]

        //percorre a array
        .map(unit => String(unit).padStart(2, '0'))
        .join(':')

    return timeString;


}