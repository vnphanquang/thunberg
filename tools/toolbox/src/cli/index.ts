// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See the @microsoft/rush package's LICENSE file for license information.

import { ToolboxCommandLine } from './cli';

console.log('@vnphanquang/toolbox\n');

const commandLine: ToolboxCommandLine = new ToolboxCommandLine();
commandLine.execute().catch(console.error); // CommandLineParser.execute() should never reject the promise
