const TEMPO_MARK = {
    GRAVE:                 {MIN: 20, MAX: 40, NAME: "Grave"}, 
    LARGHISSIMO:           {MIN: 40, MAX: 45, NAME: "Larghíssimo"}, 
    LARGO:                 {MIN: 45, MAX: 50, NAME: "Largo"}, 
    LARGHETTO:             {MIN: 50, MAX: 55, NAME: "Larghetto"}, 
    ADAGIO:                {MIN: 55, MAX: 65, NAME: "Adagio"}, 
    ADAGIETTO:             {MIN: 65, MAX: 70, NAME: "Adagietto"}, 
    ANDANTE:               {MIN: 70, MAX: 108, NAME: "Andante"}, 
    MODERATO:              {MIN: 108, MAX: 112, NAME: "Moderato"}, 
    ALLEGRO_MODERATO:      {MIN: 112, MAX: 116, NAME: "Allegro Moderato"}, 
    ALLEGRO_MA_NON_TROPPO: {MIN: 116, MAX: 120, NAME: "Allegro ma non Troppo"}, 
    ALLEGRO:               {MIN: 120, MAX: 140, NAME: "Allegro"}, 
    VIVACE:                {MIN: 140, MAX: 160, NAME: "Vivace"}, 
    VIVACISSIMO:           {MIN: 160, MAX: 170, NAME: "Largo"}, 
    ALEGRISSIMO:           {MIN: 170, MAX: 180, NAME: "Alegríssimo"}, 
    PRESTO:                {MIN: 180, MAX: 200, NAME: "Presto"}, 
    PRESTISSIMO:           {MIN: 200, MAX: 220, NAME: "Prestíssimo"} 
}

/**
 * Returns a string of the actual tempo mark
 * @param {Number} beatsPerMinute the value for beats per minute
 */
function getTempoMark(beatsPerMinute) {
    switch(true) {
        case (isBetween(beatsPerMinute, TEMPO_MARK.GRAVE.MIN, TEMPO_MARK.GRAVE.MAX)):
            return (TEMPO_MARK.GRAVE.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.LARGHISSIMO.MIN, TEMPO_MARK.LARGHISSIMO.MAX)):
            return (TEMPO_MARK.LARGHISSIMO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.LARGO.MIN, TEMPO_MARK.LARGO.MAX)):
            return (TEMPO_MARK.LARGO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.LARGHETTO.MIN, TEMPO_MARK.LARGHETTO.MAX)):
            return (TEMPO_MARK.LARGHETTO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.ADAGIO.MIN, TEMPO_MARK.ADAGIO.MAX)):
            return (TEMPO_MARK.ADAGIO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.ADAGIETTO.MIN, TEMPO_MARK.ADAGIETTO.MAX)):
            return (TEMPO_MARK.ADAGIETTO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.ANDANTE.MIN, TEMPO_MARK.ANDANTE.MAX)):
            return (TEMPO_MARK.ANDANTE.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.MODERATO.MIN, TEMPO_MARK.MODERATO.MAX)):
            return (TEMPO_MARK.MODERATO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.ALLEGRO_MODERATO.MIN, TEMPO_MARK.ALLEGRO_MODERATO.MAX)):
            return (TEMPO_MARK.ALLEGRO_MODERATO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.ALLEGRO_MA_NON_TROPPO.MIN, TEMPO_MARK.ALLEGRO_MA_NON_TROPPO.MAX)):
            return (TEMPO_MARK.ALLEGRO_MA_NON_TROPPO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.ALLEGRO.MIN, TEMPO_MARK.ALLEGRO.MAX)):
            return (TEMPO_MARK.ALLEGRO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.VIVACE.MIN, TEMPO_MARK.VIVACE.MAX)):
            return (TEMPO_MARK.VIVACE.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.VIVACISSIMO.MIN, TEMPO_MARK.VIVACISSIMO.MAX)):
            return (TEMPO_MARK.VIVACISSIMO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.ALEGRISSIMO.MIN, TEMPO_MARK.ALEGRISSIMO.MAX)):
            return (TEMPO_MARK.ALEGRISSIMO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.PRESTO.MIN, TEMPO_MARK.PRESTO.MAX)):
            return (TEMPO_MARK.PRESTO.NAME);
            break;
        case (isBetween(beatsPerMinute, TEMPO_MARK.PRESTISSIMO.MIN, TEMPO_MARK.PRESTISSIMO.MAX + 1)):
            return (TEMPO_MARK.PRESTISSIMO.NAME);
            break;
        default:
            return ("unknown tempo mark");
            break;
    }
}

/**
 * Checks if a specific number is between a range of values (must specifies the start value and the final value).
 * @param {Number} currentValue the actual value to be checked.
 * @param {Number} startValue the start value of the range.
 * @param {Number} finalValue the final value of the range.
 */
function isBetween(currentValue, startValue, finalValue) {
    if (currentValue >= startValue && currentValue < finalValue)
        return (true);
}