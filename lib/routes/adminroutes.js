
module.exports = [

    {
        method: 'GET',
        path:'/health',
        handler: function (request, reply) {
            return reply({
                status: "UP"
            });
        }
    }
];
