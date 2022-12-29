pushd app\src\main\webapp
cmd /c ng build --output-hashing=all --base-href /open-booking/
xcopy /y /s dist\open-booking\* ..\resources\static
popd

pushd app
cmd /c gradle clean jibDockerBuild
popd
