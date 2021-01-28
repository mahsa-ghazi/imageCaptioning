module.exports = {
    HTTpResponseCode: {
        'Unauthorized': 401,
        'InternalError': 500,
        'OK': 200,
        'NOTFound': 404,
        'BadRequest': 400,
        "DuplicatedRecord": 401,
        "Created": 201,
        "InvalidToken":403
    },
    HTTpMessageCode: {
        'OK': 'your request was Done successfully',
        'BadRequest': "something went wrong",
        'NOTFound': "the result was Not Found",
        "DupicatedError": "your request was Done before!",
        "MissingParameter": "some input paramerters were missed!",
        "RecordNotFound": "the specific record was not found",
        "Created": "your request was created successfully",
        "InvalidToken" : "token is invalid",
        "InternalError":"Internal Error",
        "NotVerified":"User is Not verified"
    },
}