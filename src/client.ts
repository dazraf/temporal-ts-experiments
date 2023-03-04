import { Connection, WorkflowClient } from "@temporalio/client";
import { greeterFlow } from "./flows";
import crypto from 'crypto';

const logger = console;

async function run(): Promise<void> {
    logger.log("Running Client process");
    const connectionOptions = {
        address: "127.0.0.1:7233",
    };
    const connection = await Connection.connect(connectionOptions);
    const client = new WorkflowClient({
        connection,
        // connects to 'default' namespace if not specified
        namespace: "default",
    });

    const run = await client.start(greeterFlow, {
        args: [{ name: 'Temporal' }],
        taskQueue: 'my-queue',
        workflowId: crypto.randomUUID()
    });
    const result = await run.result();
    logger.log("result:", result);

}

run().catch((err) => {
    logger.error(err);
    process.exit(1);
});