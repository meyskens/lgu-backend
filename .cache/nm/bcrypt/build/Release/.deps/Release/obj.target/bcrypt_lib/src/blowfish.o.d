cmd_Release/obj.target/bcrypt_lib/src/blowfish.o := g++ '-DNODE_GYP_MODULE_NAME=bcrypt_lib' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DBUILDING_NODE_EXTENSION' -I/root/.node-gyp/8.9.1/include/node -I/root/.node-gyp/8.9.1/src -I/root/.node-gyp/8.9.1/deps/uv/include -I/root/.node-gyp/8.9.1/deps/v8/include -I../../nan  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -O3 -fno-omit-frame-pointer -fno-rtti -fno-exceptions -std=gnu++0x -MMD -MF ./Release/.deps/Release/obj.target/bcrypt_lib/src/blowfish.o.d.raw   -c -o Release/obj.target/bcrypt_lib/src/blowfish.o ../src/blowfish.cc
Release/obj.target/bcrypt_lib/src/blowfish.o: ../src/blowfish.cc \
 ../src/node_blf.h
../src/blowfish.cc:
../src/node_blf.h:
