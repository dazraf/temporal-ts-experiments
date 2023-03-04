import { NativeConnection, Worker } from "@temporalio/worker";
const logger = console;

async function run() {
    logger.log(`worker process in ${__dirname}`);
    const connectionOptions = {
        address: "127.0.0.1:7233",
    };
    const workerConnection = await NativeConnection.connect(connectionOptions);
    logger.log("connection formed to temporal cluster");

    logger.log("creating worker")
    const worker = await Worker.create({
        connection: workerConnection,
        namespace: 'default',
        taskQueue: 'my-queue',
        workflowsPath: __dirname + '/flows/index.ts'
    });
    logger.log("starting worker");
    await worker.run();
    logger.log("worker started");
    const workerStatus = worker.getStatus();
    logger.log("worker status", workerStatus);
}

run().catch((err) => {
    logger.error(err);
    process.exit(1);
});