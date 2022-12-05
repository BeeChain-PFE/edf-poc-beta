#!/bin/bash -u

# Copyright 2018 ConsenSys AG.
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
hash truffle 2>/dev/null || {
  echo >&2 "This script requires truffle but it's not installed."
  echo >&2 "Refer to documentation to fulfill requirements."
  exit 1
}



npm install @truffle/hdwallet-provider@2.0.0
npm install truffle


truffle compile
truffle compile
truffle migrate --network quickstartWallet
truffle test --network quickstartWallet

npm start
