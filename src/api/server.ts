import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchemaSync } from "type-graphql";
import { resolvers } from "../prisma/generated/typegraphql-prisma";
import { formatError } from "./format-error";
import { PrismaClient } from ".prisma/client";

function buildContext() {
  const prisma = new PrismaClient();
  return {
    prisma,
  };
}

export function configServer(): ApolloServer {
  const schema = buildSchemaSync({
    validate: false,
    resolvers: resolvers,
  });

  return new ApolloServer({
    schema,
    playground: true,
    context: buildContext,
    formatError: formatError,
  });
}

export async function runServer(server: ApolloServer): Promise<void> {
  server.listen();
}
