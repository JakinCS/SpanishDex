


// This function generates random numbers (0 - 9) and returns them in string format
export const generateRandomNumbers = (quantity) => {
  let str = '';
 
  for (let i = 0; i < quantity; i++) {
    str += `${Math.floor(Math.random() * 10)}`
  }
  
  return str;
}


// This function takes as paramters the form state value and state setter function 
// and it is in charge of updating state based on the results of the password validation
// checks it makes. For validation, it runs the isPasswordValid() function
// and it also checks whether the password matches the other password.
// This is a very specific function and requires an exact format for the form state
// state format:
// {
//   password: {value: '', valid: null, errorType: null, message: null},
//   password2: {value: '', valid: null, errorType: null, message: null}
// }
export const handlePasswordValidCheck = (formState, formStateSetter, fieldNumber) => {
  let mainPasswordField;
  let otherPasswordField
  if (fieldNumber === 1) {
    mainPasswordField = "password";
    otherPasswordField = "password2";
  } else if (fieldNumber === 2) {
    mainPasswordField = "password2";
    otherPasswordField = "password";
  }

  // Check whether the format of the password is valid.
  const passwordValid = isPasswordValid(formState[mainPasswordField].value);

  if (!passwordValid.valid) {
    // If it isn't valid, display an error. No other logic needs to run.
    formStateSetter(prevState => ({...prevState, [mainPasswordField]: {...prevState[mainPasswordField], valid: passwordValid.valid, errorType: 'reg', message: passwordValid.message}}))
    return;
  }

  // check to see if the two fields are matching in value
  const matchesOtherField = (formState[mainPasswordField].value === formState[otherPasswordField].value);

  /* If the fields match, don't display a 'matching error' and set the state to valid for this field. 
    Also, even if the fields DON'T match, a 'matching error' isn't necessary if:
      1. The other field is displaying a different error 
      2. The other field has not be touched yet */
  if (matchesOtherField || (!formState[otherPasswordField].valid && formState[otherPasswordField].errorType === 'reg') || formState[otherPasswordField].valid === null) {
    // Remove errors for the this field
    formStateSetter(prevState => ({...prevState, [mainPasswordField]: {...prevState[mainPasswordField], valid: true, errorType: ''}}))

    // If the other field currently displays a "matching error", remove it because the fields now match.
    if (!formState[otherPasswordField].valid && formState[otherPasswordField].errorType === 'matching') {
      formStateSetter(prevState => ({...prevState, [otherPasswordField]: {...prevState[otherPasswordField], valid: true, errorType: ''}}))
    }
  } else { // Otherwise, this field needs a 'matching error'. So display one.

    formStateSetter(prevState => ({...prevState, [mainPasswordField]: {...prevState[mainPasswordField], valid: false, errorType: 'matching', message: 'Passwords must match'}}))

    // If the other field is current showing to be valid, it needs a matching error too.
    if (formState[otherPasswordField].valid) {
      formStateSetter(prevState => ({...prevState, [otherPasswordField]: {...prevState[otherPasswordField], valid: false, errorType: 'matching', message: 'Passwords must match'}}))
    }
  }
}


// Utility function used for creating a cropped image.
export const getCroppedImg = async (imageSrc, pixelCrop) => {

  // Utility function used for cropping the profile picture images
  const createImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', (error) => reject(error))
      image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
      image.src = url
    })
  }

  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  // calculate bounding box of the rotated image
  const bBoxWidth = image.width;
  const bBoxHeight = image.height;

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // draw rotated image
  ctx.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')

  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    return null
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // As Base64 string
  return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  // return new Promise((resolve, reject) => {
  //   croppedCanvas.toBlob((file) => {
  //     resolve(file)
  //   }, 'image/png')
  // })
}


// Checks whether the email inputted has a valid format.
export const isEmailValid = (email) => {
  const regexExpression = /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])$/

  if (email === '' || regexExpression.test(email)) {
    return {valid: true, message: "Email is valid"}
  } else {
    return {valid: false, message: "Invalid email address"}
  }
}


// Function to check whether a password string is valid
/* 
  Min Length: 6
  Max Length: 1024
  Characters: any
*/
export const isPasswordValid = (password) => {
  let isValid = true;
  let message = 'Password is valid';

  if (password.length === 0) {
    isValid = false;
    message = 'Password is required'
  } else if (password.length < 6) {
    isValid = false;
    message = 'Password must be at least 6 characters'
  } else if (password.length > 1024) {
    isValid = false;
    message = 'Password length cannot exceed 1024 characters'
  }

  return {valid: isValid, message}
}


// Checks whether the format of the inputted username is valid.
/* 
  Length: 2 - 25 characters,
  Allowed Characters: numbers, letters, underscores
  Other: no spaces before, in-between, or afterwards  
*/
export const isUsernameValid = (username) => {

  let isValid = true;
  let message = '';

  if (username.trim().length === 0) {
    isValid = false;
    message = 'Username is required';
  } else if (username.length < 2) {
    isValid = false;
    message = 'The username must be at least 2 characters'
  } else if (username.length > 25) {
    isValid = false;
    message = 'The username cannot be longer than 25 characters'
  } else if (/ +/.test(username)) {
    isValid = false;
    message = 'Please do not use spaces in your username'
  } else if (/\W+/.test(username)) {
    isValid = false;
    message = 'Please only use letters, numbers and underscores'
  } else if (!/^\w+$/.test(username)) {
    isValid = false;
    message = 'Username is invalid'
  }

  return {valid: isValid, message}
}


// This function returns a random color and the apropriate 
// color pairing (black or white) for use of text with the color.
export const randomColorPair = () => {
  const colors = ['#A12A1C', '#813637', '#614454', '#40506F', '#205E8C', '#0069A7', '#038396', 
    '#069B84', '#09B473', '#4FB84C', '#95BD26', '#DABF00', '#D8A700', '#D48B00', '#CF7000', 
    '#CC5400', '#C73900', '#C11C00'];
  const needsWhite = ['#A12A1C', '#813637', '#614454', '#40506F', '#205E8C', '#0069A7', '#C73900', '#C11C00'];

  // Pick a random color.
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  if (needsWhite.includes(randomColor)) {
    return [randomColor, '#FFFFFF'];
  }

  return [randomColor, '#000000'];
}


// This function calculates the next spaced repetition interval for a card based on the previous interval and the evaluation score.
// This Spaced Repetition Algorithm is a slightly modified version of the one created by Allen Ussher, author of Fresh Cards. 
// I found the origin code here: https://freshcardsapp.com/srs/simulator/  (under the "Fresh Cards algorithm(FC-3)" dropdown option).
export const spacedRepetitionCalculator = (previous, evaluation) => {
  var n, efactor, interval

    if (previous == null) {
        previous = {n:0, efactor:2.5, interval:0.0}
    }

    if (previous.n < 3) {
        // Still in learning phase, so do not change efactor
        efactor = previous.efactor

        if (evaluation.score < 3) {
            // Failed, so force re-review in 30 minutes and reset n count
            n = 0
            interval = 30 * 1.0/(24.0*60.0)
        } else {
            n = previous.n + 1

            // first interval = 30min
            // second interval = 12h
            // third interval = 24h
            if (n == 1) {
                // in 30m
                interval = 30.0 * 1.0/(24.0*60.0)
            } else if (n == 2) {
                // in 12h
                interval = 0.5
            } else {
                // in 1d
                interval = 1.0
            }
        }
        // Add 10% "fuzz" to interval to avoid bunching up reviews
        interval = interval * (1.0 + Math.random() * 0.10)
    } else {
        // Reviewing phase

        if (evaluation.score < 3) {
            // Failed, so force re-review in 30 minutes and reset n count
            n = 0
            interval = 30 * 1.0/(24.0*60.0)

            // Reduce efactor
            efactor = Math.max(1.3, previous.efactor - 0.20)
        } else {
            // Passed, so adjust efactor and compute interval


            // First see if this was done close to on time or late. We handle early reviews differently
            // because Fresh Cards allows you to review cards as many times as you'd like, outside of
            // the SRS schedule. See details below in the "early" section.

            if (evaluation.lateness >= -0.10) {
                // Review was not too early, so handle normally

                n = previous.n + 1

                var latenessScoreBonus = 0
                var intervalAdjustment = 1.0

                // Calculate the lateness ratio based on the lateness in days and the previous interval.
                const lateness = evaluation.lateness / previous.interval;

                // If this review was done late and user still got it right, give a slight bonus to the score of up to 1.0.
                // This means if a card was hard to remember AND it was late, the efactor should be unchanged. On the other
                // hand, if the card was easy, we should bump up the efactor by even more than normal.
                if (lateness >= 0.10 && evaluation.score >= 3.0) {
                    // Lateness factor is a function of previous interval length. The longer
                    // previous interval, the harder it is to get a lateness bonus.
                    // This ranges from 0.0 to 1.0.
                    let latenessFactor = Math.min(1.0, lateness)

                    // Score factor can range from 1.0 to 1.5
                    let scoreFactor = 1.0 + (evaluation.score - 3.0) / 4.0

                    // Bonus can range from 0.0 to 1.0.
                    latenessScoreBonus = 1.0 * latenessFactor * scoreFactor
                } else {
                    // Card wasn't late, so adjust differently

                    if (evaluation.score >= 3.0 && evaluation.score < 4) {
                        // hard card, so adjust interval slightly
                        intervalAdjustment = 0.8
                    }
                }

                let adjustedScore = latenessScoreBonus + evaluation.score
                efactor = Math.max(1.3, previous.efactor + (0.1 - (5 - adjustedScore) * (0.08+(5 - adjustedScore)*0.02)))

                // Figure out interval. First review is in 1d, then 6d, then based on efactor and previous interval.
                if (previous.n == 0) {
                    interval = 1
                } else if (previous.n == 1) {
                    interval = 6
                } else {
                    interval = Math.ceil(previous.interval * intervalAdjustment * efactor)
                }
            } else {
                // Card was reviewed "too early". Since Fresh Cards lets you review cards outside of the
                // SRS schedule, it takes a different approach to early reviews. It will not progress the SRS
                // schedule too quickly if you review early. If we didn't handle this case, what would happen
                // is if you review a card multiple times in the same day, it would progress the schedule and
                // might make the card due next in 30 days, which doesn't make sense. Just because you reviewed
                // it frequently doesn't mean you have committed to memory stronger. It still takes a few days
                // for it to sink it.

                // Therefore, what this section does is does a weighted average of the previous interval
                // with the interval in the future had you reviewed it on time instead of early. The weighting
                // function gives greater weight to the previous interval period if you review too early,
                // and as we approach the actual due date, we weight the next interval more. This ensures
                // we don't progress through the schedule too quickly if you review a card frequently.

                // Still increment the 'n' value as it really has no effect on 'reviewing stage' cards.
                n = previous.n + 1

                // Figure out the weight for the previous and next intervals.
                // First, normalize the lateness factor into a range of 0.0 to 1.0 instead of -1.0 to 0.0
                // (which indicates how early the review is).
                // const earliness = (1.0 + evaluation.lateness) // ########################### COMMENTED OUT ##############################
                const latenessRatio = evaluation.lateness / previous.interval;
                const earliness = (1.0 + latenessRatio)
                // min(e^(earlieness^2) - 1.0), 1.0) gives us a nice weighted curve. You can plot it on a
                // site like fooplot.com. As we get closer to the true deadline, the future is given more
                // weight.
                const futureWeight = Math.min(Math.exp(earliness * earliness) - 1.0, 1.0)
                const currentWeight = 1.0 - futureWeight

                // Next we take the score at this time and extrapolate what that score may be in the
                // future, using the weighting function. Essentially, if you reviewed 5.0 today, we will
                // decay that score down to a minimum of 3.0 in the future. Something easily remembered
                // now may not be easily remembered in the future.
                const predictedFutureScore = currentWeight * evaluation.score + futureWeight * 3.0

                // Compute the future efactor and interval using the future score
                const futureEfactor = Math.max(1.3, previous.efactor + (0.1 - (5 - predictedFutureScore) * (0.08+(5 - predictedFutureScore)*0.02)))
                var futureInterval

                // Figure out interval. First review is in 1d, then 6d, then based on efactor and previous interval.
                if (previous.n == 0) {
                    futureInterval = 1
                } else if (previous.n == 1) {
                    futureInterval = 6
                } else {
                    futureInterval = Math.ceil(previous.interval * futureEfactor)
                }


                // Finally, combine the previous and next efactor and intervals
                efactor = previous.efactor * currentWeight + futureEfactor * futureWeight
                interval = previous.interval * currentWeight + futureInterval * futureWeight
            }

            // Add 5% "fuzz" to interval to avoid bunching up reviews
            interval = interval * (1.0 + Math.random() * 0.05)
        }
    }

    return {n, efactor, interval}
}