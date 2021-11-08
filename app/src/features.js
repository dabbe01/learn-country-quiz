const featureFlags = {
    smartScore: {
        enabled: false,
        description: 'Punishment for faulty answers',
    },
    randomQuestions: {
        enabled: false,
        description: 'Randomize the questions',
    },
    tieResults: {
        enabled: false,
        description: 'Tied result if both players answer correctly an equal amount of times',
    },
};

(() => {
    if (!localStorage.getItem('features')) {
        localStorage.setItem('features', JSON.stringify(featureFlags));
    } else {
        const storedFeatures = JSON.parse(localStorage.getItem('features'));
        Object.keys(storedFeatures).forEach(key => {
            featureFlags[key] = storedFeatures[key];
        });
    }
})();